# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your email account (salsaatcal@gmail.com)
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact Form Submission: {{subject}}

**Content:**
```
New message from Salsa @ Cal contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the Salsa @ Cal website contact form.
```

4. **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. **Copy your Public Key**

## Step 5: Update the Code
Replace these placeholders in `src/app/contact/page.tsx`:

```typescript
// Replace YOUR_SERVICE_ID with your actual service ID
'YOUR_SERVICE_ID'

// Replace YOUR_TEMPLATE_ID with your actual template ID  
'YOUR_TEMPLATE_ID'

// Replace YOUR_PUBLIC_KEY with your actual public key
'YOUR_PUBLIC_KEY'
```

## Step 6: Test
1. Fill out the contact form
2. Submit and check your email
3. You should receive the form submission

## Free Tier Limits
- **200 emails per month** (perfect for a club website)
- After 200 emails: $15/month for unlimited

## Troubleshooting
- Check browser console for errors
- Verify all IDs are correct
- Make sure your email service is connected
- Check spam folder for test emails
