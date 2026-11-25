# Update the standard certification email to companies

## What changes
The default message in the "Send certification reminder" composer (admin area) and the matching fallback used when the email is sent are replaced with a new text. Subject and body stay editable before sending, as today.

**New subject:**
"DLinRT.eu review round completed – please verify and certify your product information – {CompanyName}"

**New body (draft):**
> We have just completed a new review round on DLinRT.eu, in which our independent reviewers checked the product information and the evidence listed for {CompanyName}'s products.
>
> We kindly ask you to verify that the information shown for your products is accurate and up to date, and to certify it. You can do this in any of the following ways:
>
> 1. Certify as is – if everything is correct, sign in, open your company dashboard and click "Certify Product" for each product.
> 2. Submit a revision – from the company dashboard, click "Submit Revision" on a product to propose corrections (with sources). Our editorial team reviews it and you can follow its status there.
> 3. Edit on the product page – while signed in, use the edit mode on the product page to change fields directly; changes are saved as a draft and sent to us for approval.
> 4. GitHub – if you prefer, open a pull request on the public DLinRT repository for your product files.
> 5. Reply to this email – send corrections or supporting documents to info@dlinrt.eu and we will apply them for you.
>
> A step-by-step guide for company representatives is available after signing in: https://dlinrt.eu/company/guide
>
> All changes must be supported by a publicly available source or a disclosed document. Certified products show a "Manufacturer certified" badge.
>
> Thank you for helping keep DLinRT.eu an accurate, independent reference for the radiotherapy community.

The existing green "Go to Company Overview" button and the "Questions?" footer stay.

## Technical details
- `src/components/admin/CertificationReminderDialog.tsx`: replace `DEFAULT_SUBJECT` / `DEFAULT_BODY`.
- `supabase/functions/send-certification-reminder/index.ts`: same constants (kept identical), then redeploy. Guide link uses the dlinrt.eu domain, so it passes the admin-content link check; confirm `bodyToHtml` renders it as a clickable link, adding linkification for allowed domains if it doesn't.
- No change to sending, recipients, logging or notification-preference checks.
