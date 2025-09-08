import { storage } from '../storage.js';

const sampleTemplates = [
  // Order Update Templates
  {
    name: 'order_confirmed',
    type: 'order_update',
    description: 'Order confirmation notification',
    emailSubject: '✅ Order Confirmed - {{customerName}} | Palaniappa Jewellers',
    emailHtmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #b8860b; font-size: 28px; margin-bottom: 10px;">🏺 Palaniappa Jewellers</h1>
            <div style="height: 3px; background: linear-gradient(90deg, #b8860b, #ffd700, #b8860b); margin: 10px auto; width: 100px;"></div>
          </div>
          
          <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">✅ Order Confirmed!</h2>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">Dear {{customerName}},</p>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            Thank you for your order! We're delighted to confirm that your order has been received and is being prepared with the utmost care.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #b8860b;">
            <h3 style="color: #2c3e50; margin-top: 0;">Order Details:</h3>
            <p style="margin: 5px 0;"><strong>Order ID:</strong> {{orderId}}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> {{orderStatus}}</p>
            <p style="margin: 5px 0;"><strong>Order Date:</strong> {{orderDate}}</p>
          </div>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            Our skilled artisans will now begin crafting your jewelry with traditional techniques passed down through generations. 
            We'll keep you updated on your order's progress.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:{{supportEmail}}" style="display: inline-block; background-color: #b8860b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Contact Support</a>
          </div>
          
          <div style="border-top: 1px solid #ecf0f1; padding-top: 20px; margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 14px;">
            <p>Thank you for choosing Palaniappa Jewellers</p>
            <p>📞 {{supportPhone}} | 📧 {{supportEmail}}</p>
            <p>Creating timeless elegance since generations</p>
          </div>
        </div>
      </div>
    `,
    smsTemplate: `🏺 Palaniappa Jewellers: Hello {{customerName}}! Your order {{orderId}} has been confirmed. Status: {{orderStatus}}. We'll keep you updated. Thank you for choosing us! 📞 {{supportPhone}}`,
    whatsappTemplate: `✨ *Palaniappa Jewellers* ✨

Hello {{customerName}}! 👋

🎉 Great news! Your order has been *confirmed* and is being prepared with care.

📋 *Order Details:*
• Order ID: {{orderId}}
• Status: {{orderStatus}}
• Date: {{orderDate}}

Our skilled artisans will now begin crafting your jewelry with traditional techniques passed down through generations. We'll keep you updated on your order's progress.

Thank you for choosing Palaniappa Jewellers! 🙏

📞 Need help? Contact us at {{supportPhone}}
📧 Email: {{supportEmail}}

*Creating timeless elegance since generations* ✨`,
    isActive: true
  },
  
  {
    name: 'order_processing',
    type: 'order_update',
    description: 'Order is being processed',
    emailSubject: '⚒️ Your Order is Being Crafted - {{orderId}} | Palaniappa Jewellers',
    emailHtmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #b8860b; font-size: 28px; margin-bottom: 10px;">🏺 Palaniappa Jewellers</h1>
          </div>
          
          <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">⚒️ Order In Progress</h2>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">Dear {{customerName}},</p>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            Exciting news! Our master craftsmen have begun working on your order {{orderId}}. 
            Each piece is being carefully handcrafted with attention to every detail.
          </p>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #b8860b;">
            <p style="margin: 0; color: #856404;"><strong>🎯 Current Status:</strong> {{orderStatus}}</p>
            <p style="margin: 10px 0 0 0; color: #856404;">Our artisans are working with traditional techniques to create your perfect piece.</p>
          </div>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            We'll notify you as soon as your order is ready for shipping. Thank you for your patience!
          </p>
        </div>
      </div>
    `,
    smsTemplate: `⚒️ Palaniappa Jewellers: {{customerName}}, great news! Your order {{orderId}} is now being crafted by our master artisans. Status: {{orderStatus}}. We'll update you soon!`,
    whatsappTemplate: `⚒️ *Order Update - Palaniappa Jewellers*

Hello {{customerName}}! 

🎉 Exciting news! Our master craftsmen have begun working on your order.

📋 *Order: {{orderId}}*
📍 *Status: {{orderStatus}}*

Each piece is being carefully handcrafted with attention to every detail using traditional techniques passed down through generations.

We'll notify you as soon as your order is ready for shipping. Thank you for your patience! 🙏

📞 {{supportPhone}} | 📧 {{supportEmail}}`,
    isActive: true
  },

  {
    name: 'order_shipped',
    type: 'order_update', 
    description: 'Order has been shipped',
    emailSubject: '🚚 Your Order is On Its Way - {{orderId}} | Palaniappa Jewellers',
    emailHtmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #b8860b; font-size: 28px; margin-bottom: 10px;">🏺 Palaniappa Jewellers</h1>
          </div>
          
          <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">🚚 Order Shipped!</h2>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">Dear {{customerName}},</p>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            Wonderful news! Your order {{orderId}} has been carefully packaged and shipped. 
            Your beautifully crafted jewelry is now on its way to you!
          </p>
          
          <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724;"><strong>📦 Tracking Information:</strong></p>
            <p style="margin: 5px 0; color: #155724;">Tracking Number: {{trackingNumber}}</p>
            <p style="margin: 5px 0; color: #155724;">Estimated Delivery: {{estimatedDelivery}}</p>
          </div>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            Please keep this tracking number safe. You can use it to monitor your package's journey.
          </p>
        </div>
      </div>
    `,
    smsTemplate: `🚚 Palaniappa Jewellers: {{customerName}}, your order {{orderId}} has been shipped! Track: {{trackingNumber}}. Estimated delivery: {{estimatedDelivery}}. 📞 {{supportPhone}}`,
    whatsappTemplate: `🚚 *Shipped - Palaniappa Jewellers*

Hello {{customerName}}! 

🎉 Wonderful news! Your order has been shipped and is on its way to you!

📦 *Shipping Details:*
• Order: {{orderId}}
• Tracking: {{trackingNumber}}
• Est. Delivery: {{estimatedDelivery}}

Your beautifully crafted jewelry is now on its way to you! Please keep the tracking number safe.

📞 {{supportPhone}} | 📧 {{supportEmail}}

*Thank you for choosing Palaniappa Jewellers!* ✨`,
    isActive: true
  },

  // Product Launch Template
  {
    name: 'new_product_launch',
    type: 'product_launch',
    description: 'New product launch notification',
    emailSubject: '✨ New Collection Launch - {{productName}} | Palaniappa Jewellers',
    emailHtmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #b8860b; font-size: 28px; margin-bottom: 10px;">🏺 Palaniappa Jewellers</h1>
            <h2 style="color: #2c3e50; margin-bottom: 20px;">✨ New Collection Launch</h2>
          </div>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">Dear {{customerName}},</p>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            We're thrilled to introduce our latest masterpiece: <strong>{{productName}}</strong>
          </p>
          
          <div style="background-color: #fff8dc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #b8860b;">
            <h3 style="color: #b8860b; margin-top: 0;">{{productName}}</h3>
            <p style="color: #34495e; margin: 10px 0;">{{productDescription}}</p>
            <p style="color: #b8860b; font-size: 18px; font-weight: bold;">Starting from {{productPrice}}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{productUrl}}" style="display: inline-block; background-color: #b8860b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Collection</a>
          </div>
        </div>
      </div>
    `,
    smsTemplate: `✨ Palaniappa Jewellers: New launch! {{productName}} - {{productDescription}}. Starting from {{productPrice}}. Visit us or call {{supportPhone}} to explore!`,
    whatsappTemplate: `✨ *New Collection Launch - Palaniappa Jewellers*

Hello {{customerName}}! 

🎉 We're thrilled to introduce our latest masterpiece:

💎 *{{productName}}*
{{productDescription}}

💰 Starting from {{productPrice}}

This exquisite piece combines traditional craftsmanship with contemporary elegance.

Visit our store or call us to explore this stunning new collection!

📞 {{supportPhone}} | 📧 {{supportEmail}}

*Timeless elegance, crafted for you* ✨`,
    isActive: true
  },

  // Festival Offer Template
  {
    name: 'festival_offer',
    type: 'marketing',
    description: 'Festival special offers',
    emailSubject: '🎉 Festival Special - {{offerTitle}} | Palaniappa Jewellers',
    emailHtmlTemplate: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ff6b6b, #ffa726);">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #b8860b; font-size: 32px; margin-bottom: 10px;">🏺 Palaniappa Jewellers</h1>
            <h2 style="color: #e74c3c; margin-bottom: 20px;">🎉 {{offerTitle}}</h2>
          </div>
          
          <div style="background: linear-gradient(45deg, #b8860b, #ffd700); padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
            <h3 style="color: white; margin: 0; font-size: 24px;">{{discountPercentage}}% OFF</h3>
            <p style="color: white; margin: 5px 0;">on selected jewelry items</p>
          </div>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">Dear {{customerName}},</p>
          
          <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
            Celebrate {{festivalName}} with our exclusive jewelry collection! 
            Get {{discountPercentage}}% off on selected items.
          </p>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;"><strong>⏰ Limited Time Offer</strong></p>
            <p style="margin: 5px 0; color: #856404;">Valid until: {{offerValidUntil}}</p>
            <p style="margin: 5px 0; color: #856404;">Use code: <strong>{{promoCode}}</strong></p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{shopUrl}}" style="display: inline-block; background-color: #e74c3c; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;">Shop Now</a>
          </div>
        </div>
      </div>
    `,
    smsTemplate: `🎉 {{festivalName}} Special at Palaniappa Jewellers! {{discountPercentage}}% OFF on selected jewelry. Code: {{promoCode}}. Valid until {{offerValidUntil}}. Call {{supportPhone}}!`,
    whatsappTemplate: `🎉 *{{festivalName}} Special - Palaniappa Jewellers*

Hello {{customerName}}! 

🪔 Celebrate {{festivalName}} with our exclusive jewelry collection!

💰 *{{discountPercentage}}% OFF* on selected items
🎫 Promo Code: *{{promoCode}}*
⏰ Valid until: {{offerValidUntil}}

This is the perfect time to add sparkle to your celebration or gift something special to your loved ones.

Visit our store or call us to explore the collection!

📞 {{supportPhone}} | 📧 {{supportEmail}}

*Shine bright this {{festivalName}}!* ✨`,
    isActive: true
  }
];

async function createSampleTemplates() {
  console.log('Creating sample notification templates...');
  
  try {
    for (const template of sampleTemplates) {
      const existing = await storage.getNotificationTemplate(template.name);
      
      if (existing) {
        console.log(`Template '${template.name}' already exists, skipping...`);
        continue;
      }
      
      const created = await storage.createNotificationTemplate(template as any);
      console.log(`✅ Created template: ${created.name} (${created.type})`);
    }
    
    console.log('\n🎉 Sample templates created successfully!');
    console.log('\nTemplates created:');
    console.log('• order_confirmed - Order confirmation notifications');
    console.log('• order_processing - Order processing updates');  
    console.log('• order_shipped - Shipping notifications');
    console.log('• new_product_launch - Product launch announcements');
    console.log('• festival_offer - Festival and promotional offers');
    
  } catch (error) {
    console.error('Error creating sample templates:', error);
  }
}

// Export the function so it can be called from other scripts
export { createSampleTemplates };