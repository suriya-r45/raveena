import sgMail from '@sendgrid/mail';
import twilio from 'twilio';
import { storage } from '../storage.js';
import type { 
  SendNotificationRequest, 
  NotificationTemplate,
  Notification,
  InsertNotification,
  InsertUserActivity 
} from '@shared/schema.js';

// Environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@palaniappajewellers.com';

// Initialize services
let twilioClient: twilio.Twilio | null = null;
let isEmailServiceEnabled = false;
let isSmsServiceEnabled = false;

// Initialize SendGrid
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  isEmailServiceEnabled = true;
  console.log('✅ SendGrid email service initialized');
} else {
  console.log('⚠️  SendGrid API key not found. Email notifications will be disabled.');
}

// Initialize Twilio
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER) {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  isSmsServiceEnabled = true;
  console.log('✅ Twilio SMS/WhatsApp service initialized');
} else {
  console.log('⚠️  Twilio credentials not found. SMS/WhatsApp notifications will be disabled.');
}

interface NotificationResult {
  success: boolean;
  channel: string;
  externalId?: string;
  error?: string;
}

class NotificationService {
  
  // Template variable replacement
  private replaceTemplateVariables(template: string, variables: Record<string, any>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      result = result.replace(regex, String(value || ''));
    }
    return result;
  }

  // Send email notification
  private async sendEmail(
    recipientEmail: string,
    recipientName: string,
    subject: string,
    htmlContent: string,
    textContent?: string
  ): Promise<NotificationResult> {
    if (!isEmailServiceEnabled || !SENDGRID_API_KEY) {
      return {
        success: false,
        channel: 'email',
        error: 'Email service not configured'
      };
    }

    try {
      const msg = {
        to: recipientEmail,
        from: {
          email: FROM_EMAIL,
          name: 'Palaniappa Jewellers'
        },
        subject: subject,
        html: htmlContent,
        text: textContent || htmlContent.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      };

      const response = await sgMail.send(msg);
      
      return {
        success: true,
        channel: 'email',
        externalId: response[0]?.headers?.['x-message-id'] || undefined
      };
    } catch (error: any) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        channel: 'email',
        error: error.message || 'Email sending failed'
      };
    }
  }

  // Send SMS notification
  private async sendSms(
    recipientPhone: string,
    message: string
  ): Promise<NotificationResult> {
    if (!isSmsServiceEnabled || !twilioClient) {
      return {
        success: false,
        channel: 'sms',
        error: 'SMS service not configured'
      };
    }

    try {
      const response = await twilioClient.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: recipientPhone
      });

      return {
        success: true,
        channel: 'sms',
        externalId: response.sid
      };
    } catch (error: any) {
      console.error('SMS sending failed:', error);
      return {
        success: false,
        channel: 'sms',
        error: error.message || 'SMS sending failed'
      };
    }
  }

  // Send WhatsApp notification
  private async sendWhatsApp(
    recipientPhone: string,
    message: string,
    mediaUrl?: string
  ): Promise<NotificationResult> {
    if (!isSmsServiceEnabled || !twilioClient) {
      return {
        success: false,
        channel: 'whatsapp',
        error: 'WhatsApp service not configured'
      };
    }

    try {
      const messageOptions: any = {
        body: message,
        from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${recipientPhone}`
      };

      if (mediaUrl) {
        messageOptions.mediaUrl = [mediaUrl];
      }

      const response = await twilioClient.messages.create(messageOptions);

      return {
        success: true,
        channel: 'whatsapp',
        externalId: response.sid
      };
    } catch (error: any) {
      console.error('WhatsApp sending failed:', error);
      return {
        success: false,
        channel: 'whatsapp',
        error: error.message || 'WhatsApp sending failed'
      };
    }
  }

  // Get notification template by name
  private async getTemplate(templateName: string): Promise<NotificationTemplate | null> {
    try {
      return await storage.getNotificationTemplate(templateName);
    } catch (error) {
      console.error('Failed to get template:', error);
      return null;
    }
  }

  // Send notification using template
  public async sendNotification(request: SendNotificationRequest): Promise<NotificationResult[]> {
    const results: NotificationResult[] = [];
    
    let template: NotificationTemplate | null = null;
    if (request.templateId) {
      template = await storage.getNotificationTemplateById(request.templateId);
    }

    for (const channel of request.channels) {
      let result: NotificationResult;
      
      try {
        // Create notification record
        const notification: InsertNotification = {
          userId: request.userId,
          sessionId: request.sessionId,
          templateId: request.templateId,
          type: request.type,
          channel,
          recipientEmail: request.recipientEmail,
          recipientPhone: request.recipientPhone,
          recipientName: request.recipientName,
          subject: request.subject,
          textContent: request.message,
          orderId: request.orderId,
          productId: request.productId,
          campaignId: request.campaignId,
          templateVariables: request.templateVariables || {},
          status: 'pending'
        };

        switch (channel) {
          case 'email':
            if (!request.recipientEmail) {
              result = {
                success: false,
                channel: 'email',
                error: 'Recipient email is required for email notifications'
              };
              break;
            }

            let emailSubject = request.subject;
            let emailContent = request.message;
            
            if (template && template.emailSubject && template.emailHtmlTemplate) {
              emailSubject = this.replaceTemplateVariables(
                template.emailSubject, 
                request.templateVariables || {}
              );
              emailContent = this.replaceTemplateVariables(
                template.emailHtmlTemplate, 
                request.templateVariables || {}
              );
            }

            notification.subject = emailSubject;
            notification.htmlContent = emailContent;

            result = await this.sendEmail(
              request.recipientEmail,
              request.recipientName || 'Valued Customer',
              emailSubject,
              emailContent
            );
            break;

          case 'sms':
            if (!request.recipientPhone) {
              result = {
                success: false,
                channel: 'sms',
                error: 'Recipient phone is required for SMS notifications'
              };
              break;
            }

            let smsMessage = request.message;
            if (template && template.smsTemplate) {
              smsMessage = this.replaceTemplateVariables(
                template.smsTemplate,
                request.templateVariables || {}
              );
            }

            notification.textContent = smsMessage;

            result = await this.sendSms(request.recipientPhone, smsMessage);
            break;

          case 'whatsapp':
            if (!request.recipientPhone) {
              result = {
                success: false,
                channel: 'whatsapp',
                error: 'Recipient phone is required for WhatsApp notifications'
              };
              break;
            }

            let whatsappMessage = request.message;
            let whatsappMedia: string | undefined;
            
            if (template && template.whatsappTemplate) {
              whatsappMessage = this.replaceTemplateVariables(
                template.whatsappTemplate,
                request.templateVariables || {}
              );
              whatsappMedia = template.whatsappMediaUrl || undefined;
            }

            notification.textContent = whatsappMessage;
            notification.mediaUrl = whatsappMedia;

            result = await this.sendWhatsApp(
              request.recipientPhone, 
              whatsappMessage,
              whatsappMedia
            );
            break;

          default:
            result = {
              success: false,
              channel,
              error: 'Unsupported notification channel'
            };
        }

        // Update notification record with result
        notification.status = result.success ? 'sent' : 'failed';
        notification.externalId = result.externalId;
        notification.errorMessage = result.error;
        
        if (result.success) {
          notification.sentAt = new Date();
        } else {
          notification.failedAt = new Date();
        }

        // Save notification to database
        await storage.createNotification(notification);

        results.push(result);

      } catch (error: any) {
        console.error(`Failed to send ${channel} notification:`, error);
        results.push({
          success: false,
          channel,
          error: error.message || 'Unknown error occurred'
        });
      }
    }

    return results;
  }

  // Send order update notification
  public async sendOrderUpdate(
    orderId: string,
    status: string,
    customerEmail: string,
    customerPhone: string,
    customerName: string
  ): Promise<void> {
    // Get user preferences
    let preferences = null;
    try {
      const user = await storage.getUserByEmail(customerEmail);
      if (user) {
        preferences = await storage.getNotificationPreferences(user.id);
      }
    } catch (error) {
      console.log('Could not find user preferences, using defaults');
    }

    const channels: string[] = [];
    
    // Determine which channels to use based on preferences
    if (!preferences || preferences.orderUpdatesEmail !== false) {
      channels.push('email');
    }
    if (preferences?.orderUpdatesSms === true) {
      channels.push('sms');
    }
    if (preferences?.orderUpdatesWhatsapp === true) {
      channels.push('whatsapp');
    }

    if (channels.length === 0) {
      console.log('No notification channels enabled for order update');
      return;
    }

    const templateVariables = {
      customerName,
      orderId,
      orderStatus: status,
      supportEmail: 'support@palaniappajewellers.com',
      supportPhone: '+919597201554'
    };

    await this.sendNotification({
      type: 'order_update',
      channels: channels as ('email' | 'sms' | 'whatsapp')[],
      recipientEmail: customerEmail,
      recipientPhone: customerPhone,
      recipientName: customerName,
      subject: `Order Update: ${orderId}`,
      message: `Hello ${customerName}, your order ${orderId} status has been updated to: ${status}`,
      orderId,
      templateVariables
    });
  }

  // Track user activity for personalization
  public async trackActivity(activity: InsertUserActivity): Promise<void> {
    try {
      await storage.createUserActivity(activity);
    } catch (error) {
      console.error('Failed to track user activity:', error);
    }
  }

  // Get service status
  public getServiceStatus() {
    return {
      email: isEmailServiceEnabled,
      sms: isSmsServiceEnabled,
      whatsapp: isSmsServiceEnabled, // WhatsApp uses same Twilio service
      services: {
        sendgrid: isEmailServiceEnabled,
        twilio: isSmsServiceEnabled
      }
    };
  }
}

export default new NotificationService();