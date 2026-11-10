import { test, expect } from '@playwright/test';

const DONOR = 'LPADonor17';
const DONOR_NRIC = 'S8162873D';
const DONEE = 'LPADonee17';
const DONEE_NRIC = 'S8325187E';
const CI_NRIC = 'S2470768G';

test('Account Sign-in', async ({ page }) => {

  await page.goto('https://opgdev-internet.msf.gov.sg/OPGO_Debug/LoginSampleUsers.aspx');

  await page.getByText('-- Select User -- Remove item').click();
  await page.getByRole('textbox', { name: 'Search' }).fill(DONOR);
  await page.getByRole('option', { name : DONOR}).click();
  await expect(page.getByText(DONOR_NRIC, { exact: true })).toBeVisible();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wtcommonLogin').click();

  await expect(page.getByText(`Welcome, ${DONOR}`)).toBeVisible();
});

test('Donor Online LPA Application', async ({ page }) => {

  await page.goto('https://opgdev-internet.msf.gov.sg/OPGO_Debug/LoginSampleUsers.aspx');

  await page.getByText('-- Select User -- Remove item').click();
  await page.getByRole('textbox', { name: 'Search' }).fill(DONOR);
  await page.getByRole('option', { name : DONOR}).click();
  await expect(page.getByText(DONOR_NRIC, { exact: true })).toBeVisible();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wtcommonLogin').click();

  await expect(page.getByText(`Welcome, ${DONOR}`)).toBeVisible();
  await expect(page.getByText('You do not have any LPA')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply for an LPA' })).toBeVisible();
  await page.getByRole('button', { name: 'Apply for an LPA' }).click();

  await expect(page.getByText('What is a Lasting Power of')).toBeVisible();
  await expect(page.getByText('Read Important InformationUnderstand what an LPA is, how to choose your Donees')).toBeVisible();
  await page.getByRole('button', { name: 'Let\'s Begin' }).click();

  await expect(page.getByText('When your Donee can act on')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Choosing your Donees')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('When your Replacement Donee')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('What you need before you start')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Fees involved', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.getByText('Verify Personal ParticularsProvide your personal particulars for your LPA')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Appoint DoneesAppoint up to 2')).toBeVisible();
  await page.getByRole('textbox', { name: 'Full Name as in NRIC/FIN' }).click();
  await page.getByRole('textbox', { name: 'Full Name as in NRIC/FIN' }).fill(DONEE);
  await page.getByRole('textbox', { name: 'NRIC/FIN No.' }).click();
  await page.getByRole('textbox', { name: 'NRIC/FIN No.' }).fill(DONEE_NRIC);
  await page.getByRole('textbox', { name: 'Email Address (If Applicable)' }).click();
  await page.getByRole('textbox', { name: 'Email Address (If Applicable)' }).fill(`${DONEE}@gmail.com`);
  await page.getByRole('textbox', { name: 'Local Mobile No.' }).click();
  await page.getByRole('textbox', { name: 'Local Mobile No.' }).fill('88883333');
  await page.getByLabel('The Donee is my').selectOption('1');
  await page.getByRole('checkbox', { name: 'Personal Welfare' }).check();
  await page.getByRole('checkbox', { name: 'Property and Affairs' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('How will the Donee(s) decide on your Personal Welfare?')).toBeVisible();
  await page.getByRole('radio', { name: 'Yes', exact: true }).check();
  await expect(page.getByText('How will the Donee(s) decide on your Property and Affairs?')).toBeVisible();
  await page.getByRole('radio', { name: 'No, the Donee(s) does/do not' }).check();
  await page.locator('#OPGO_Common_CW_wt7_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_OPGO_TH_wt129_block_wtMainContent_wt45_wt13_OPGO_Patterns_wt147_block_wtSectionCardPlaceholder_wtrdbPAQ2No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Appoint Replacement DoneeAppoint 1 person to step in if a Donee is unable to')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Review DraftCheck that all')).toBeVisible({ timeout: 10000 });
  await page.getByRole('checkbox', { name: 'I have read and confirm the' }).check();
  await page.getByRole('button', { name: 'Notify Donee(s)' }).click();
  await expect(page.getByText('Notify Donees?Your Donees')).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.locator('#OPGO_Common_CW_wt7_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_OPGO_TH_wt129_block_wtMainContent_OPGO_Common_CW_wt39_block_OPGO_Patterns_wt24_block_wtTitle_wtTitle')).toContainText('Your LPA has been sent to your Donees.');
  await expect(page.getByRole('link', { name: 'Find a Certificate Issuer' })).toBeVisible();
  await page.getByRole('button', { name: 'Back to Home' }).click();

  await expect(page.locator('#OPGO_Common_CW_wt9_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt64_OPGO_Patterns_wt84_block_wtSectionCardPlaceholder_OutSystemsUIWeb_wt23_block_wtColumn1_OutSystemsUIWeb_wt71_block_wtColumn2')).toContainText('Draft – Pending Donee(s)’ Acceptance');
});

test('Donee Acceptance', async ({ page }) => {
  await page.goto('https://opgdev-internet.msf.gov.sg/OPGO_Debug/LoginSampleUsers.aspx');

  await page.getByText('-- Select User -- Remove item').click();
  await page.getByRole('textbox', { name: 'Search' }).fill(DONEE);
  await page.getByRole('option', { name : DONEE}).click();
  await expect(page.getByText(DONEE_NRIC, { exact: true })).toBeVisible();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wtcommonLogin').click();

  await expect(page.getByText(`Welcome, ${DONEE}`)).toBeVisible();
  await expect(page.getByRole('button', { name: 'View LPA to Accept' })).toBeVisible();
  await page.getByRole('button', { name: 'View LPA to Accept' }).click();

  await expect(page.getByText('What it means to be a Donee')).toBeVisible();
  await expect(page.getByText('Read Important InformationUnderstand your responsibilities as a Donee and what')).toBeVisible();
  await page.getByRole('button', { name: 'Let\'s Begin' }).click();

  await expect(page.getByText('How you must make decisions')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('When your appointment ends')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('When a Replacement Donee')).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.getByText('Verify Personal ParticularsProvide your personal particulars for your Donee')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Review & Respond to AppointmentReview the powers granted to you by the Donor')).toBeVisible();
  await page.getByRole('checkbox', { name: 'By clicking on “Accept”, I,' }).check();
  await page.getByRole('button', { name: 'Accept' }).click();

  await expect(page.getByText('Do you accept your')).toBeVisible();
  await page.getByText('Yes, I Accept').click();

  await expect(page.getByText('Donee Appointment Accepted')).toBeVisible();
  await expect(page.getByText('Your Donor will be notified')).toBeVisible();
  await page.getByRole('button', { name: 'Return to Dashboard' }).click();

  await expect(async () => {
    await page.reload();
  
    await expect(page.locator('#OPGO_Common_CW_wt9_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt18_wtDoneeAppontmentList_ctl00_wt15_OPGO_Patterns_wt23_block_wtSectionCardPlaceholder_OutSystemsUIWeb_wt17_block_wtColumn1_OutSystemsUIWeb_wt4_block_wtColumn2_OutSystemsUIWeb_wt69_block_wtColumn2')).toContainText('Draft – Pending Certification');
    }).toPass({ 
    timeout: 180000,
    intervals: [5000] 
  });

});

test('CI Certification', async ({ page }) => {
  await page.goto('https://opgdev-internet.msf.gov.sg/OPGO_Debug/LoginSampleUsers.aspx');

  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt41').check();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt20').click();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt20').fill(CI_NRIC);
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wtcommonLogin').click();

  await expect(page.getByText('You as a Certificate Issuer')).toBeVisible();
  await page.getByRole('textbox', { name: 'NRIC/FIN No.' }).click();
  await page.getByRole('textbox', { name: 'NRIC/FIN No.' }).fill(DONOR_NRIC);
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('Certify LPA')).toBeVisible();
  await expect(page.getByText('Retrieve LPAEnter the access')).toBeVisible();
  await page.getByRole('button', { name: 'Generate Access Code' }).click();
  await expect(page.getByText('Access code sent via SMS to')).toBeVisible();
  await page.getByRole('textbox', { name: 'Access Code' }).click();
  await page.getByRole('textbox', { name: 'Access Code' }).fill('000000');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Review LPAReview the LPA with')).toBeVisible();
  await expect(page.getByText('Are you able to certify this')).toBeVisible();
  await page.getByRole('radio', { name: 'Yes' }).check();

  await expect(page.getByText('Statement by Certificate')).toBeVisible();
  await page.getByRole('radio', { name: 'a medical practitioner registered as a specialist in psychiatry under the' }).check();
  await page.getByRole('checkbox', { name: 'I have read and confirm the' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Please fill in the required field(s)')).toBeVisible();

  await page.getByRole('textbox', { name: 'Name of Practice' }).click();
  await page.getByRole('textbox', { name: 'Name of Practice' }).fill('CI TEST Clinic');
  await page.getByRole('textbox', { name: 'Contact No.' }).click();
  await page.getByRole('textbox', { name: 'Contact No.' }).fill('99990000');
  await page.getByRole('textbox', { name: 'Email Address (If Applicable)' }).click();
  await page.getByRole('textbox', { name: 'Email Address (If Applicable)' }).fill('citest@gmail.com');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Donor AcknowledgementConfirm')).toBeVisible();
  await expect(page.getByText('By proceeding, the Donor')).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();
  
  await expect(page.getByText('Certify LPAWitness and sign')).toBeVisible();
  await expect(page.getByText('Before signing and witnessing')).toBeVisible();
  await page.getByRole('button', { name: 'Submit for Registration' }).click();

  await expect(page.getByText('Confirm submission of LPA')).toBeVisible();
  await page.getByText('Submit LPA').click();

  await expect(page.getByText('The LPA has been submitted to')).toBeVisible();
  await expect(page.getByText('The Donor will be notified')).toBeVisible();

  await page.goto('https://opgdev-internet.msf.gov.sg/OPGO_Debug/LoginSampleUsers.aspx');
  await page.getByText('-- Select User -- Remove item').click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill(DONOR);
  await page.getByRole('option', { name : DONOR}).click();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wtcommonLogin').click();
  await page.waitForTimeout(10000);
  await page.getByRole('link', { name: 'Overview' }).click();
  await expect(page.getByText('LPA - Pending Payment')).toBeVisible();
});

test('Donor Payment', async ({ page }) => {
  await page.goto('https://opgdev-internet.msf.gov.sg/OPGO_Debug/LoginSampleUsers.aspx');
  await page.getByText('-- Select User -- Remove item').click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill(DONOR);
  await page.getByRole('option', { name : DONOR}).click();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wtcommonLogin').click();

  await page.getByRole('button', { name: 'Make Payment' }).click();

  //enets bypass

  // await expect(page.getByText('Review your invoice and')).toBeVisible();
  // await page.getByRole('button', { name: 'Bypass eNets' }).click();
  // await expect(page.getByText('Payment successful. You can')).toBeVisible();
  // await expect(page.getByRole('button', { name: 'Print Receipt' })).toBeVisible();
  // await page.getByRole('button', { name: 'Continue' }).click();

  // await expect(page.getByText('Your LPA has been submitted')).toBeVisible();
  // await expect(page.getByText('You will be notified via SMS')).toBeVisible();
  // await page.getByRole('button', { name: 'Return to Dashboard' }).click();
 
  // card payment
  await page.getByRole('button', { name: 'Make Payment' }).click();
  await expect(page.getByText('Proceed to payment?')).toBeVisible();
  await expect(page.getByText('You will be redirected to the')).toBeVisible();
  await page.getByText('Proceed to Payment', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Name on Card Email' }).click();
  await page.getByRole('textbox', { name: 'Name on Card Email' }).fill(DONOR);
  await page.getByRole('textbox', { name: 'Name on Card Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Card Number' }).fill('4111111111111111');
  await page.getByRole('textbox', { name: 'CVV/CVV2' }).click();
  await page.getByRole('textbox', { name: 'CVV/CVV2' }).fill('123');
  await page.getByLabel('Expiry Date').selectOption('12');
  await page.locator('#selectYearId').selectOption('2031');
  await page.locator('#consumerEmail').click();
  await page.locator('#consumerEmail').fill(`${DONOR}@gmail.com`);
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Your LPA has been submitted')).toBeVisible();
  await expect(page.getByText('You will be notified via SMS')).toBeVisible();
  await page.getByRole('button', { name: 'Return to Dashboard' }).click();

  await expect(async () => {
    await page.reload();
  
    await expect(page.locator('#OPGO_Common_CW_wt9_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt64_OPGO_Patterns_wt84_block_wtSectionCardPlaceholder_OutSystemsUIWeb_wt23_block_wtColumn1_OutSystemsUIWeb_wt71_block_wtColumn2')).toContainText('LPA - Pending Acceptance');
    }).toPass({ 
    timeout: 60000,
    intervals: [10000] 
  });

  await expect(async () => {
    await page.reload();
  
    await expect(page.locator('#OPGO_Common_CW_wt9_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt64_OPGO_Patterns_wt84_block_wtSectionCardPlaceholder_OutSystemsUIWeb_wt23_block_wtColumn1_OutSystemsUIWeb_wt71_block_wtColumn2')).toContainText('LPA - Pending Registration');
    }).toPass({ 
    timeout: 300000,
    intervals: [10000] 
  });

  await expect(async () => {
    await page.reload();
  
    await expect(page.locator('#OPGO_Common_CW_wt9_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wt64_OPGO_Patterns_wt84_block_wtSectionCardPlaceholder_OutSystemsUIWeb_wt23_block_wtColumn1_OutSystemsUIWeb_wt71_block_wtColumn2')).toContainText('LPA - Registered');
    }).toPass({ 
    timeout: 300000,
    intervals: [10000] 
  });

});

test('Donor Revocation', async ({ page }) => {
  await page.goto('https://opgdev-internet.msf.gov.sg/OPGO_Debug/LoginSampleUsers.aspx');
  await page.getByText('-- Select User -- Remove item').click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill(DONOR);
  await page.getByRole('option', { name : DONOR}).click();
  await page.locator('#OPGO_Common_CW_wt12_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_wtcommonLogin').click();

  await expect(page.getByRole('button', { name: 'Revoke LPA' })).toBeVisible();
  await page.getByRole('button', { name: 'Revoke LPA' }).click();

  await expect(page.getByText('Understand the conditions for')).toBeVisible();
  await expect(page.getByText('Revoking and cancelling your')).toBeVisible();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await expect(page.getByText('Registered LPA', { exact: true })).toBeVisible();
  await expect(page.getByText('Notification to Donee(s)')).toBeVisible();
  
  await expect(page.getByText('Reason for Revocation')).toBeVisible();
  await page.locator('#OPGO_Common_CW_wt46_block_OPGO_TH_wt4_block_wt66_OutSystemsUIWeb_wt6_block_wtContent_wtMainContent_wtMainContent_wtMainContent_OPGO_TH_wt53_block_wtMainContent_wt78_OPGO_Patterns_wt12_block_wtSectionCardPlaceholder_wtRevocationReasonInput').selectOption('7');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(`${DONOR}@gmail.com`);

  await page.getByRole('checkbox', { name: 'I confirm that I have' }).check();
  await page.getByRole('checkbox', { name: 'Delivered in person' }).check();
  await page.getByRole('checkbox', { name: 'Sent by post' }).check();
  await page.getByRole('checkbox', { name: 'Sent by email' }).check();

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Statement by Donor')).toBeVisible();
  await page.getByRole('checkbox', { name: 'I have read and confirm the' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Review your invoice and')).toBeVisible();
  await page.getByRole('button', { name: 'Bypass eNets' }).click();

  await expect(page.getByText('Payment successful. You can')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print Receipt' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(5000);

  await expect(async () => {
    await page.reload();
  
    await expect(page.getByText('You do not have any LPA')).toBeVisible();
    }).toPass({ 
    timeout: 180000,
    intervals: [10000] 
  });
});