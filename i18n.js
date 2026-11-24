/* ACK Diary language support: English, Tamil (தமிழ்) and Hindi (हिन्दी).
 * Translates the interface text on the page after it loads and keeps it translated as the app updates.
 * Your own entries (descriptions, notes, names) typed into fields are never changed.
 * The chosen language is remembered on this device. */
(function () {
  "use strict";
  var STORE_KEY = "ack-diary-language";
  var LANGS = [
    { code: "en", label: "English", htmlLang: "en-IN" },
    { code: "ta", label: "தமிழ்", htmlLang: "ta-IN" },
    { code: "hi", label: "हिन्दी", htmlLang: "hi-IN" },
  ];

  // English text -> [Tamil, Hindi]
  var D = {
    // App shell and navigation
    "ACK Diary": ["ACK டைரி", "ACK डायरी"],
    "Every Penny Counts. Every Goal Matters.": ["ஒவ்வொரு காசும் முக்கியம். ஒவ்வொரு இலக்கும் முக்கியம்.", "हर पैसा मायने रखता है। हर लक्ष्य मायने रखता है।"],
    "Opening your diary…": ["உங்கள் டைரி திறக்கிறது…", "आपकी डायरी खुल रही है…"],
    "Home": ["முகப்பு", "होम"],
    "Annual Budget": ["ஆண்டு பட்ஜெட்", "वार्षिक बजट"],
    "Annual budget": ["ஆண்டு பட்ஜெட்", "वार्षिक बजट"],
    "Daily Diary": ["தினசரி டைரி", "दैनिक डायरी"],
    "Daily diary": ["தினசரி டைரி", "दैनिक डायरी"],
    "Daily": ["தினசரி", "दैनिक"],
    "Transactions": ["பரிவர்த்தனைகள்", "लेन-देन"],
    "Entries": ["பதிவுகள்", "प्रविष्टियाँ"],
    "Reports": ["அறிக்கைகள்", "रिपोर्ट"],
    "Savings Planner": ["சேமிப்பு திட்டம்", "बचत योजना"],
    "Savings planner": ["சேமிப்பு திட்டம்", "बचत योजना"],
    "Reminders": ["நினைவூட்டல்கள்", "रिमाइंडर"],
    "Settings": ["அமைப்புகள்", "सेटिंग्स"],
    "More": ["மேலும்", "और"],
    "More sections": ["மேலும் பகுதிகள்", "और सेक्शन"],
    "Main": ["முதன்மை", "मुख्य"],
    "Quick add expense": ["விரைவாக செலவு சேர்", "जल्दी खर्च जोड़ें"],
    "Quick add": ["விரைவாக சேர்", "जल्दी जोड़ें"],
    "Saved on this device": ["இந்த சாதனத்தில் சேமிக்கப்பட்டது", "इस डिवाइस पर सहेजा गया"],
    "Backed up": ["காப்புப் பிரதி எடுக்கப்பட்டது", "बैकअप हो गया"],
    "Sign in to back up": ["காப்புப் பிரதிக்கு உள்நுழைக", "बैकअप के लिए साइन इन करें"],
    "Syncing…": ["ஒத்திசைக்கிறது…", "सिंक हो रहा है…"],
    "Sync status": ["ஒத்திசைவு நிலை", "सिंक स्थिति"],
    "Synced": ["ஒத்திசைக்கப்பட்டது", "सिंक हो गया"],
    "Sync now": ["இப்போது ஒத்திசை", "अभी सिंक करें"],
    "Language": ["மொழி", "भाषा"],

    // Home
    "Good morning": ["காலை வணக்கம்", "सुप्रभात"],
    "Good afternoon": ["மதிய வணக்கம்", "नमस्कार"],
    "Good evening": ["மாலை வணக்கம்", "शुभ संध्या"],
    "Here is your pocket diary for the month.": ["இந்த மாதத்திற்கான உங்கள் பாக்கெட் டைரி இதோ.", "यह रही इस महीने की आपकी पॉकेट डायरी।"],
    "Key figures": ["முக்கிய எண்ணிக்கைகள்", "मुख्य आंकड़े"],
    "Income": ["வருமானம்", "आय"],
    "Expenses": ["செலவுகள்", "खर्च"],
    "Expense": ["செலவு", "खर्च"],
    "expense": ["செலவு", "खर्च"],
    "Remaining balance": ["மீதமுள்ள இருப்பு", "बची हुई राशि"],
    "Income minus expenses": ["வருமானம் கழித்தல் செலவுகள்", "आय में से खर्च घटाकर"],
    "Total savings": ["மொத்த சேமிப்பு", "कुल बचत"],
    "Includes money put into investments": ["முதலீடுகளில் போட்ட பணமும் அடங்கும்", "निवेश में डाला गया पैसा शामिल है"],
    "Savings rate": ["சேமிப்பு விகிதம்", "बचत दर"],
    "Monthly budget": ["மாதாந்திர பட்ஜெட்", "मासिक बजट"],
    "Monthly spending": ["மாதாந்திர செலவு", "मासिक खर्च"],
    "Budget used": ["பயன்படுத்திய பட்ஜெட்", "उपयोग किया गया बजट"],
    "Budget used this month": ["இந்த மாதம் பயன்படுத்திய பட்ஜெட்", "इस महीने उपयोग किया गया बजट"],
    "Budget left": ["மீதமுள்ள பட்ஜெட்", "बचा हुआ बजट"],
    "No budget set": ["பட்ஜெட் அமைக்கப்படவில்லை", "कोई बजट तय नहीं"],
    "Set your budget": ["உங்கள் பட்ஜெட்டை அமைக்கவும்", "अपना बजट तय करें"],
    "Due today": ["இன்று செலுத்த வேண்டும்", "आज देय"],
    "Upcoming payments": ["வரவிருக்கும் கட்டணங்கள்", "आने वाले भुगतान"],
    "Nothing due in the next two weeks.": ["அடுத்த இரண்டு வாரங்களில் செலுத்த வேண்டியது எதுவும் இல்லை.", "अगले दो हफ्तों में कुछ भी देय नहीं है।"],
    "Manage reminders": ["நினைவூட்டல்களை நிர்வகி", "रिमाइंडर प्रबंधित करें"],
    "Spending calendar": ["செலவு நாட்காட்டி", "खर्च कैलेंडर"],
    "Calendar": ["நாட்காட்டி", "कैलेंडर"],
    "Darker days had more spending. A green dot marks money received.": ["அடர் நிற நாட்களில் அதிக செலவு. பச்சைப் புள்ளி பெற்ற பணத்தைக் குறிக்கிறது.", "गहरे रंग वाले दिनों में ज़्यादा खर्च हुआ। हरा बिंदु मिला हुआ पैसा दिखाता है।"],
    "Notes for this month": ["இந்த மாதத்திற்கான குறிப்புகள்", "इस महीने के नोट्स"],
    "See all reports": ["அனைத்து அறிக்கைகளையும் பார்", "सभी रिपोर्ट देखें"],
    "Your diary is empty": ["உங்கள் டைரி காலியாக உள்ளது", "आपकी डायरी खाली है"],
    "Add first entry": ["முதல் பதிவைச் சேர்", "पहली प्रविष्टि जोड़ें"],
    "Add some entries and suggestions will show up here.": ["சில பதிவுகளைச் சேர்த்தால் பரிந்துரைகள் இங்கே தோன்றும்.", "कुछ प्रविष्टियाँ जोड़ें, सुझाव यहाँ दिखेंगे।"],
    "Suggestions for this month": ["இந்த மாதத்திற்கான பரிந்துரைகள்", "इस महीने के सुझाव"],

    // Categories
    "Food & Groceries": ["உணவு & மளிகை", "खाना और किराना"],
    "Shopping": ["ஷாப்பிங்", "खरीदारी"],
    "Entertainment": ["பொழுதுபோக்கு", "मनोरंजन"],
    "Other Expenses": ["பிற செலவுகள்", "अन्य खर्च"],
    "Uncategorised": ["வகைப்படுத்தப்படாதது", "बिना श्रेणी"],
    "Untitled": ["தலைப்பில்லாதது", "बिना शीर्षक"],
    "Electricity": ["மின்சாரம்", "बिजली"],
    "Emergency Fund": ["அவசர நிதி", "आपातकालीन निधि"],
    "Family": ["குடும்பம்", "परिवार"],
    "Fuel": ["எரிபொருள்", "ईंधन"],
    "Gold": ["தங்கம்", "सोना"],
    "Insurance": ["காப்பீடு", "बीमा"],
    "Investments": ["முதலீடுகள்", "निवेश"],
    "Medical": ["மருத்துவம்", "चिकित्सा"],
    "Mobile & Internet": ["மொபைல் & இணையம்", "मोबाइल और इंटरनेट"],
    "Other": ["பிற", "अन्य"],
    "RD / FD": ["RD / FD", "RD / FD"],
    "Rent": ["வாடகை", "किराया"],
    "Salary / Income": ["சம்பளம் / வருமானம்", "वेतन / आय"],
    "Transport": ["போக்குவரத்து", "परिवहन"],
    "Savings": ["சேமிப்பு", "बचत"],

    // Payment modes
    "Cash": ["பணம்", "नकद"],
    "Cheque": ["காசோலை", "चेक"],
    "Credit Card": ["கிரெடிட் கார்டு", "क्रेडिट कार्ड"],
    "Debit Card": ["டெபிட் கார்டு", "डेबिट कार्ड"],
    "Net Banking": ["நெட் பேங்கிங்", "नेट बैंकिंग"],
    "Wallet": ["வாலட்", "वॉलेट"],
    "Payment mode": ["கட்டண முறை", "भुगतान का तरीका"],
    "Payment Mode": ["கட்டண முறை", "भुगतान का तरीका"],
    "Mode": ["முறை", "तरीका"],

    // Months
    "January": ["ஜனவரி", "जनवरी"], "February": ["பிப்ரவரி", "फ़रवरी"], "March": ["மார்ச்", "मार्च"],
    "April": ["ஏப்ரல்", "अप्रैल"], "May": ["மே", "मई"], "June": ["ஜூன்", "जून"],
    "July": ["ஜூலை", "जुलाई"], "August": ["ஆகஸ்ட்", "अगस्त"], "September": ["செப்டம்பர்", "सितंबर"],
    "October": ["அக்டோபர்", "अक्टूबर"], "November": ["நவம்பர்", "नवंबर"], "December": ["டிசம்பர்", "दिसंबर"],
    "Previous month": ["முந்தைய மாதம்", "पिछला महीना"],
    "Next month": ["அடுத்த மாதம்", "अगला महीना"],
    "Current month": ["நடப்பு மாதம்", "चालू महीना"],
    "Month": ["மாதம்", "महीना"],
    "Months": ["மாதங்கள்", "महीने"],

    // Entry form
    "Amount": ["தொகை", "राशि"],
    "Category": ["வகை", "श्रेणी"],
    "Description": ["விவரம்", "विवरण"],
    "Notes": ["குறிப்புகள்", "नोट्स"],
    "Date": ["தேதி", "तारीख"],
    "Date and time": ["தேதி மற்றும் நேரம்", "तारीख और समय"],
    "Entry type": ["பதிவு வகை", "प्रविष्टि का प्रकार"],
    "Entry": ["பதிவு", "प्रविष्टि"],
    "Repeats": ["மீண்டும் வரும்", "दोहराव"],
    "Does not repeat": ["மீண்டும் வராது", "दोहराया नहीं जाता"],
    "Every day": ["தினமும்", "हर दिन"],
    "Every week": ["ஒவ்வொரு வாரமும்", "हर हफ्ते"],
    "Every month": ["ஒவ்வொரு மாதமும்", "हर महीने"],
    "Every 3 months": ["ஒவ்வொரு 3 மாதமும்", "हर 3 महीने"],
    "Every year": ["ஒவ்வொரு ஆண்டும்", "हर साल"],
    "Attach receipt": ["ரசீதை இணை", "रसीद जोड़ें"],
    "Replace receipt": ["ரசீதை மாற்று", "रसीद बदलें"],
    "Receipt preview": ["ரசீது முன்னோட்டம்", "रसीद पूर्वावलोकन"],
    "Save entry": ["பதிவைச் சேமி", "प्रविष्टि सहेजें"],
    "Save changes": ["மாற்றங்களைச் சேமி", "बदलाव सहेजें"],
    "Save anyway": ["எப்படியும் சேமி", "फिर भी सहेजें"],
    "Edit entry": ["பதிவைத் திருத்து", "प्रविष्टि बदलें"],
    "Delete entry": ["பதிவை நீக்கு", "प्रविष्टि हटाएँ"],
    "Discard": ["நிராகரி", "छोड़ें"],
    "Remove": ["அகற்று", "हटाएँ"],
    "Close": ["மூடு", "बंद करें"],
    "Cancel": ["ரத்து செய்", "रद्द करें"],
    "Confirm": ["உறுதிப்படுத்து", "पुष्टि करें"],
    "Voice": ["குரல்", "आवाज़"],
    "Enter by voice": ["குரல் மூலம் உள்ளிடு", "आवाज़ से दर्ज करें"],
    "Listening…": ["கேட்கிறது…", "सुन रहा है…"],
    "Entry saved": ["பதிவு சேமிக்கப்பட்டது", "प्रविष्टि सहेजी गई"],
    "Entry updated": ["பதிவு புதுப்பிக்கப்பட்டது", "प्रविष्टि अपडेट हुई"],
    "Entry deleted": ["பதிவு நீக்கப்பட்டது", "प्रविष्टि हटाई गई"],
    "Entry removed": ["பதிவு அகற்றப்பட்டது", "प्रविष्टि हटाई गई"],
    "Entry confirmed": ["பதிவு உறுதிப்படுத்தப்பட்டது", "प्रविष्टि की पुष्टि हुई"],
    "Enter an amount greater than zero": ["பூஜ்ஜியத்தை விட அதிகமான தொகையை உள்ளிடவும்", "शून्य से अधिक राशि दर्ज करें"],
    "Enter an amount greater than zero.": ["பூஜ்ஜியத்தை விட அதிகமான தொகையை உள்ளிடவும்.", "शून्य से अधिक राशि दर्ज करें।"],
    "Enter an amount first.": ["முதலில் தொகையை உள்ளிடவும்.", "पहले राशि दर्ज करें।"],
    "That amount is too large.": ["அந்தத் தொகை மிகப் பெரியது.", "यह राशि बहुत बड़ी है।"],
    "Choose a valid date.": ["சரியான தேதியைத் தேர்ந்தெடுக்கவும்.", "सही तारीख चुनें।"],
    "No description": ["விவரம் இல்லை", "कोई विवरण नहीं"],
    "No match — please choose": ["பொருத்தம் இல்லை — தேர்ந்தெடுக்கவும்", "कोई मेल नहीं — कृपया चुनें"],
    "Not sure about this category. Please check it.": ["இந்த வகை உறுதியாகத் தெரியவில்லை. சரிபார்க்கவும்.", "इस श्रेणी के बारे में पक्का नहीं। कृपया जाँचें।"],
    "You categorised this before": ["இதை முன்பு நீங்கள் வகைப்படுத்தினீர்கள்", "आपने इसे पहले वर्गीकृत किया था"],
    "Could not hear that. Try again.": ["கேட்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.", "सुनाई नहीं दिया। फिर से कोशिश करें।"],
    "Could not read that image.": ["அந்தப் படத்தைப் படிக்க முடியவில்லை.", "वह चित्र पढ़ा नहीं जा सका।"],
    "Voice entry is not supported in this browser. Try Chrome or Safari.": ["இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. Chrome அல்லது Safari முயற்சிக்கவும்.", "इस ब्राउज़र में आवाज़ से दर्ज करना समर्थित नहीं है। Chrome या Safari आज़माएँ।"],
    "Microphone access was blocked. Allow it in your browser settings.": ["மைக்ரோஃபோன் அணுகல் தடுக்கப்பட்டது. உலாவி அமைப்புகளில் அனுமதிக்கவும்.", "माइक्रोफ़ोन की अनुमति रोकी गई है। ब्राउज़र सेटिंग्स में अनुमति दें।"],
    "You are offline. Changes are saved on this device and will sync later.": ["நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். மாற்றங்கள் இந்த சாதனத்தில் சேமிக்கப்பட்டு பின்னர் ஒத்திசைக்கப்படும்.", "आप ऑफ़लाइन हैं। बदलाव इस डिवाइस पर सहेजे गए हैं और बाद में सिंक होंगे।"],
    "Could not sync right now. Your data is safe on this device.": ["இப்போது ஒத்திசைக்க முடியவில்லை. உங்கள் தரவு இந்த சாதனத்தில் பாதுகாப்பாக உள்ளது.", "अभी सिंक नहीं हो सका। आपका डेटा इस डिवाइस पर सुरक्षित है।"],
    "Cloud sync is not configured. Your data is stored on this device.": ["கிளவுட் ஒத்திசைவு அமைக்கப்படவில்லை. உங்கள் தரவு இந்த சாதனத்தில் சேமிக்கப்படுகிறது.", "क्लाउड सिंक सेट नहीं है। आपका डेटा इस डिवाइस पर सहेजा गया है।"],
    "Sign in to back up and sync your data.": ["உங்கள் தரவைக் காப்புப் பிரதி எடுத்து ஒத்திசைக்க உள்நுழைக.", "अपने डेटा का बैकअप और सिंक करने के लिए साइन इन करें।"],
    "This is not an ACK Diary backup file.": ["இது ACK டைரி காப்புக் கோப்பு அல்ல.", "यह ACK डायरी बैकअप फ़ाइल नहीं है।"],

    // Budget
    "Your plan for the year": ["இந்த ஆண்டுக்கான உங்கள் திட்டம்", "साल के लिए आपकी योजना"],
    "Financial year": ["நிதியாண்டு", "वित्तीय वर्ष"],
    "April to March": ["ஏப்ரல் முதல் மார்ச் வரை", "अप्रैल से मार्च"],
    "January to December": ["ஜனவரி முதல் டிசம்பர் வரை", "जनवरी से दिसंबर"],
    "Annual income": ["ஆண்டு வருமானம்", "वार्षिक आय"],
    "Annual expenses budget": ["ஆண்டு செலவு பட்ஜெட்", "वार्षिक खर्च बजट"],
    "Savings target": ["சேமிப்பு இலக்கு", "बचत लक्ष्य"],
    "Save budget": ["பட்ஜெட்டைச் சேமி", "बजट सहेजें"],
    "Budget saved": ["பட்ஜெட் சேமிக்கப்பட்டது", "बजट सहेजा गया"],
    "Saved": ["சேமிக்கப்பட்டது", "सहेजा गया"],
    "Category budgets for the year": ["ஆண்டுக்கான வகை பட்ஜெட்டுகள்", "साल के लिए श्रेणी बजट"],
    "Monthly spending limits": ["மாதாந்திர செலவு வரம்புகள்", "मासिक खर्च सीमा"],
    "Leave a month empty to use the annual budget divided by 12.": ["ஆண்டு பட்ஜெட்டை 12-ஆல் வகுத்த தொகையைப் பயன்படுத்த ஒரு மாதத்தைக் காலியாக விடவும்.", "वार्षिक बजट को 12 से भाग देकर उपयोग करने के लिए महीना खाली छोड़ें।"],
    "Spread evenly": ["சமமாகப் பிரி", "बराबर बाँटें"],
    "Planned against actual": ["திட்டமிட்டது vs உண்மையானது", "योजना बनाम वास्तविक"],
    "Planned": ["திட்டமிட்டது", "योजना"],
    "Actual": ["உண்மையானது", "वास्तविक"],
    "Difference": ["வேறுபாடு", "अंतर"],
    "Spending": ["செலவு", "खर्च"],
    "Not set": ["அமைக்கப்படவில்லை", "तय नहीं"],
    "Save your budget to see how the year is going.": ["ஆண்டு எப்படிச் செல்கிறது என்பதைப் பார்க்க உங்கள் பட்ஜெட்டைச் சேமிக்கவும்.", "साल कैसा चल रहा है यह देखने के लिए अपना बजट सहेजें।"],
    "Enter the annual expenses budget first.": ["முதலில் ஆண்டு செலவு பட்ஜெட்டை உள்ளிடவும்.", "पहले वार्षिक खर्च बजट दर्ज करें।"],
    "Income against plan": ["திட்டத்துடன் வருமானம்", "योजना के मुकाबले आय"],
    "Spending against plan": ["திட்டத்துடன் செலவு", "योजना के मुकाबले खर्च"],
    "Savings against target": ["இலக்குடன் சேமிப்பு", "लक्ष्य के मुकाबले बचत"],
    "Your category budgets add up to more than the annual expenses budget.": ["உங்கள் வகை பட்ஜெட்டுகள் ஆண்டு செலவு பட்ஜெட்டை விட அதிகமாக உள்ளன.", "आपके श्रेणी बजट का जोड़ वार्षिक खर्च बजट से ज़्यादा है।"],
    "Your monthly limits add up to more than the annual expenses budget.": ["உங்கள் மாதாந்திர வரம்புகள் ஆண்டு செலவு பட்ஜெட்டை விட அதிகமாக உள்ளன.", "आपकी मासिक सीमाओं का जोड़ वार्षिक खर्च बजट से ज़्यादा है।"],

    // Diary
    "Daily log": ["தினசரி பதிவு", "दैनिक लॉग"],
    "Spent": ["செலவழித்தது", "खर्च किया"],
    "Saved this month": ["இந்த மாதம் சேமித்தது", "इस महीने बचाया"],
    "Total saved": ["மொத்தம் சேமித்தது", "कुल बचत"],
    "Put into savings and investments": ["சேமிப்பு மற்றும் முதலீடுகளில் போட்டது", "बचत और निवेश में डाला गया"],
    "Spending by category": ["வகை வாரியான செலவு", "श्रेणी के अनुसार खर्च"],
    "No spending recorded this month.": ["இந்த மாதம் செலவு எதுவும் பதிவு செய்யப்படவில்லை.", "इस महीने कोई खर्च दर्ज नहीं हुआ।"],
    "Payments due this month": ["இந்த மாதம் செலுத்த வேண்டியவை", "इस महीने देय भुगतान"],
    "Mark paid": ["செலுத்தியதாகக் குறி", "भुगतान हुआ चिह्नित करें"],
    "Add one": ["ஒன்றைச் சேர்", "एक जोड़ें"],
    "Add to this month": ["இந்த மாதத்தில் சேர்", "इस महीने में जोड़ें"],
    "Monthly notes": ["மாதாந்திர குறிப்புகள்", "मासिक नोट्स"],
    "A blank page": ["ஒரு வெற்றுப் பக்கம்", "एक खाली पन्ना"],
    "Nothing has been written on this month yet.": ["இந்த மாதத்தில் இதுவரை எதுவும் எழுதப்படவில்லை.", "इस महीने अभी तक कुछ नहीं लिखा गया है।"],
    "Month closed. Entries can still be edited.": ["மாதம் மூடப்பட்டது. பதிவுகளை இன்னும் திருத்தலாம்.", "महीना बंद हुआ। प्रविष्टियाँ अब भी बदली जा सकती हैं।"],
    "Month reopened": ["மாதம் மீண்டும் திறக்கப்பட்டது", "महीना फिर से खोला गया"],

    // Transactions
    "All entries": ["அனைத்து பதிவுகள்", "सभी प्रविष्टियाँ"],
    "Search entries": ["பதிவுகளைத் தேடு", "प्रविष्टियाँ खोजें"],
    "Search description, notes or amount": ["விவரம், குறிப்புகள் அல்லது தொகையைத் தேடு", "विवरण, नोट्स या राशि खोजें"],
    "All categories": ["அனைத்து வகைகள்", "सभी श्रेणियाँ"],
    "All modes": ["அனைத்து முறைகள்", "सभी तरीके"],
    "All time": ["எல்லா காலமும்", "पूरा समय"],
    "Time range": ["கால வரம்பு", "समय सीमा"],
    "Sort": ["வரிசைப்படுத்து", "क्रम"],
    "Newest first": ["புதியது முதலில்", "नया पहले"],
    "Oldest first": ["பழையது முதலில்", "पुराना पहले"],
    "Largest amount": ["அதிகத் தொகை", "सबसे बड़ी राशि"],
    "Smallest amount": ["குறைந்த தொகை", "सबसे छोटी राशि"],
    "Weekly": ["வாராந்திர", "साप्ताहिक"],
    "Monthly": ["மாதாந்திர", "मासिक"],
    "Import": ["இறக்குமதி", "आयात"],
    "Review": ["மதிப்பாய்வு", "समीक्षा"],
    "Nothing to review": ["மதிப்பாய்வு செய்ய எதுவும் இல்லை", "समीक्षा के लिए कुछ नहीं"],
    "No entries here": ["இங்கே பதிவுகள் இல்லை", "यहाँ कोई प्रविष्टि नहीं"],
    "Add an entry above, or import a bank statement.": ["மேலே ஒரு பதிவைச் சேர்க்கவும், அல்லது வங்கி அறிக்கையை இறக்குமதி செய்யவும்.", "ऊपर प्रविष्टि जोड़ें, या बैंक स्टेटमेंट आयात करें।"],
    "Nothing matches these filters. Clear a filter to see more.": ["இந்த வடிகட்டிகளுக்கு எதுவும் பொருந்தவில்லை. மேலும் பார்க்க ஒரு வடிகட்டியை நீக்கவும்.", "इन फ़िल्टर से कुछ मेल नहीं खाता। और देखने के लिए फ़िल्टर हटाएँ।"],
    "Your diary table. Tap a row to edit it.": ["உங்கள் டைரி அட்டவணை. திருத்த ஒரு வரிசையைத் தட்டவும்.", "आपकी डायरी तालिका। बदलने के लिए पंक्ति पर टैप करें।"],
    "Table columns": ["அட்டவணை நெடுவரிசைகள்", "तालिका कॉलम"],
    "Choose which columns to show and in what order.": ["எந்த நெடுவரிசைகளைக் காட்ட வேண்டும், எந்த வரிசையில் என்பதைத் தேர்ந்தெடுக்கவும்.", "कौन से कॉलम और किस क्रम में दिखाने हैं, चुनें।"],
    "Reset to default": ["இயல்புநிலைக்கு மீட்டமை", "डिफ़ॉल्ट पर रीसेट करें"],
    "Columns reset": ["நெடுவரிசைகள் மீட்டமைக்கப்பட்டன", "कॉलम रीसेट हुए"],
    "Add row": ["வரிசையைச் சேர்", "पंक्ति जोड़ें"],
    "Add a row": ["ஒரு வரிசையைச் சேர்", "एक पंक्ति जोड़ें"],
    "Row added": ["வரிசை சேர்க்கப்பட்டது", "पंक्ति जोड़ी गई"],
    "New row: description": ["புதிய வரிசை: விவரம்", "नई पंक्ति: विवरण"],
    "Balance": ["இருப்பு", "शेष राशि"],
    "In": ["வரவு", "आया"],
    "Out": ["செலவு", "गया"],
    "Bank or UPI statement": ["வங்கி அல்லது UPI அறிக்கை", "बैंक या UPI स्टेटमेंट"],
    "Statement file": ["அறிக்கை கோப்பு", "स्टेटमेंट फ़ाइल"],
    "Upload a CSV or Excel statement downloaded from your bank or UPI app. Nothing leaves your device until you sign in and sync.": ["உங்கள் வங்கி அல்லது UPI செயலியில் பதிவிறக்கிய CSV அல்லது Excel அறிக்கையைப் பதிவேற்றவும். நீங்கள் உள்நுழைந்து ஒத்திசைக்கும் வரை எதுவும் உங்கள் சாதனத்தை விட்டு வெளியேறாது.", "अपने बैंक या UPI ऐप से डाउनलोड किया CSV या Excel स्टेटमेंट अपलोड करें। साइन इन और सिंक करने तक कुछ भी आपके डिवाइस से बाहर नहीं जाता।"],
    "Paste SMS or email receipts": ["SMS அல்லது மின்னஞ்சல் ரசீதுகளை ஒட்டவும்", "SMS या ईमेल रसीदें चिपकाएँ"],
    "Paste bank alerts or receipt emails. Separate each with a blank line.": ["வங்கி அறிவிப்புகள் அல்லது ரசீது மின்னஞ்சல்களை ஒட்டவும். ஒவ்வொன்றையும் வெற்று வரியால் பிரிக்கவும்.", "बैंक अलर्ट या रसीद ईमेल चिपकाएँ। हर एक को खाली पंक्ति से अलग करें।"],
    "Read pasted text": ["ஒட்டிய உரையைப் படி", "चिपकाया गया टेक्स्ट पढ़ें"],
    "Pasted alerts": ["ஒட்டிய அறிவிப்புகள்", "चिपकाए गए अलर्ट"],
    "These entries are not counted in your totals yet.": ["இந்தப் பதிவுகள் இன்னும் உங்கள் மொத்தத்தில் கணக்கிடப்படவில்லை.", "ये प्रविष्टियाँ अभी आपके कुल में नहीं गिनी गई हैं।"],
    "Add selected, keep the rest for review": ["தேர்ந்தெடுத்தவற்றைச் சேர், மற்றவற்றை மதிப்பாய்வுக்கு வை", "चुनी हुई जोड़ें, बाकी समीक्षा के लिए रखें"],
    "No transactions were found in that input.": ["அந்த உள்ளீட்டில் பரிவர்த்தனைகள் எதுவும் கிடைக்கவில்லை.", "उस इनपुट में कोई लेन-देन नहीं मिला।"],
    "Could not read that file.": ["அந்தக் கோப்பைப் படிக்க முடியவில்லை.", "वह फ़ाइल पढ़ी नहीं जा सकी।"],
    "That file is larger than 8 MB. Split it by month and try again.": ["அந்தக் கோப்பு 8 MB-ஐ விடப் பெரியது. மாத வாரியாகப் பிரித்து மீண்டும் முயற்சிக்கவும்.", "वह फ़ाइल 8 MB से बड़ी है। उसे महीने के हिसाब से बाँटकर फिर कोशिश करें।"],
    " · Already in your diary": [" · ஏற்கனவே உங்கள் டைரியில் உள்ளது", " · पहले से आपकी डायरी में है"],
    " · Check category": [" · வகையைச் சரிபார்க்கவும்", " · श्रेणी जाँचें"],
    " · Possible duplicate": [" · நகலாக இருக்கலாம்", " · संभावित दोहराव"],

    // Reports
    "Reports and analytics": ["அறிக்கைகள் மற்றும் பகுப்பாய்வு", "रिपोर्ट और विश्लेषण"],
    "Annual summary": ["ஆண்டு சுருக்கம்", "वार्षिक सारांश"],
    "Spending by month": ["மாத வாரியான செலவு", "महीने के अनुसार खर्च"],
    "Budget against actual": ["பட்ஜெட் vs உண்மையானது", "बजट बनाम वास्तविक"],
    "Budget": ["பட்ஜெட்", "बजट"],
    "Savings trend": ["சேமிப்பு போக்கு", "बचत का रुझान"],
    "Highest spending days": ["அதிகம் செலவழித்த நாட்கள்", "सबसे ज़्यादा खर्च वाले दिन"],
    "Recurring payments": ["தொடர் கட்டணங்கள்", "आवर्ती भुगतान"],
    "Planned expenses": ["திட்டமிட்ட செலவுகள்", "नियोजित खर्च"],
    "Payment": ["கட்டணம்", "भुगतान"],
    "Average": ["சராசரி", "औसत"],
    "Top category": ["முதன்மை வகை", "शीर्ष श्रेणी"],
    "None yet": ["இன்னும் இல்லை", "अभी कोई नहीं"],
    "No numbers yet": ["இன்னும் எண்கள் இல்லை", "अभी कोई आंकड़े नहीं"],
    "No spending this month.": ["இந்த மாதம் செலவு இல்லை.", "इस महीने कोई खर्च नहीं।"],
    "Charts appear once you add a few entries.": ["சில பதிவுகளைச் சேர்த்ததும் விளக்கப்படங்கள் தோன்றும்.", "कुछ प्रविष्टियाँ जोड़ने पर चार्ट दिखेंगे।"],
    "Set a budget to compare it with what you spend.": ["நீங்கள் செலவழிப்பதுடன் ஒப்பிட ஒரு பட்ஜெட்டை அமைக்கவும்.", "अपने खर्च से तुलना करने के लिए बजट तय करें।"],
    "Payments that repeat in 3 or more months, or that you mark as repeating, will be listed here.": ["3 அல்லது அதற்கு மேற்பட்ட மாதங்களில் மீண்டும் வரும் அல்லது நீங்கள் தொடர்வதாகக் குறிக்கும் கட்டணங்கள் இங்கே பட்டியலிடப்படும்.", "जो भुगतान 3 या ज़्यादा महीनों में दोहराए जाते हैं, या जिन्हें आप दोहराव वाला चिह्नित करते हैं, यहाँ दिखेंगे।"],

    // Savings
    "Yearly savings goal": ["ஆண்டு சேமிப்பு இலக்கு", "वार्षिक बचत लक्ष्य"],
    "Savings target progress": ["சேமிப்பு இலக்கு முன்னேற்றம்", "बचत लक्ष्य की प्रगति"],
    "No savings target yet": ["இன்னும் சேமிப்பு இலக்கு இல்லை", "अभी कोई बचत लक्ष्य नहीं"],
    "Set a target": ["இலக்கை அமை", "लक्ष्य तय करें"],
    "Set a yearly savings target in your annual budget and track your progress here.": ["உங்கள் ஆண்டு பட்ஜெட்டில் ஆண்டு சேமிப்பு இலக்கை அமைத்து உங்கள் முன்னேற்றத்தை இங்கே கண்காணிக்கவும்.", "अपने वार्षिक बजट में सालाना बचत लक्ष्य तय करें और यहाँ अपनी प्रगति देखें।"],
    "You have reached this year’s savings goal.": ["இந்த ஆண்டின் சேமிப்பு இலக்கை அடைந்துவிட்டீர்கள்.", "आपने इस साल का बचत लक्ष्य पूरा कर लिया है।"],
    "Where your savings go": ["உங்கள் சேமிப்பு எங்கே செல்கிறது", "आपकी बचत कहाँ जाती है"],
    "Month by month": ["மாதம் மாதமாக", "महीने दर महीने"],
    "Rate": ["விகிதம்", "दर"],
    "Money you put into these categories counts as saved, not spent. Set a yearly amount for each one in Annual budget.": ["இந்த வகைகளில் நீங்கள் போடும் பணம் செலவாக அல்ல, சேமிப்பாகக் கணக்கிடப்படும். ஒவ்வொன்றுக்கும் ஆண்டுத் தொகையை ஆண்டு பட்ஜெட்டில் அமைக்கவும்.", "इन श्रेणियों में डाला गया पैसा खर्च नहीं, बचत गिना जाता है। हर एक के लिए सालाना राशि वार्षिक बजट में तय करें।"],

    // Reminders
    "Never miss a bill, premium or deposit.": ["எந்த பில், பிரீமியம் அல்லது வைப்புத்தொகையையும் தவறவிடாதீர்கள்.", "कोई बिल, प्रीमियम या जमा कभी न चूकें।"],
    "Add reminder": ["நினைவூட்டலைச் சேர்", "रिमाइंडर जोड़ें"],
    "Edit reminder": ["நினைவூட்டலைத் திருத்து", "रिमाइंडर बदलें"],
    "No reminders yet": ["இன்னும் நினைவூட்டல்கள் இல்லை", "अभी कोई रिमाइंडर नहीं"],
    "Name": ["பெயர்", "नाम"],
    "What is it for?": ["இது எதற்கு?", "यह किसके लिए है?"],
    "Amount (optional)": ["தொகை (விருப்பத்தேர்வு)", "राशि (वैकल्पिक)"],
    "Due date": ["செலுத்த வேண்டிய தேதி", "देय तिथि"],
    "Remind me": ["எனக்கு நினைவூட்டு", "मुझे याद दिलाएँ"],
    "On the day": ["அன்றே", "उसी दिन"],
    "Notification": ["அறிவிப்பு", "सूचना"],
    "Turn on": ["இயக்கு", "चालू करें"],
    "Credit card bill": ["கிரெடிட் கார்டு பில்", "क्रेडिट कार्ड बिल"],
    "Electricity bill": ["மின்சார பில்", "बिजली बिल"],
    "Insurance premium": ["காப்பீட்டு பிரீமியம்", "बीमा प्रीमियम"],
    "PPF contribution": ["PPF பங்களிப்பு", "PPF योगदान"],
    "RD deposit": ["RD வைப்பு", "RD जमा"],
    "SIP payment": ["SIP கட்டணம்", "SIP भुगतान"],
    "Reminder added": ["நினைவூட்டல் சேர்க்கப்பட்டது", "रिमाइंडर जोड़ा गया"],
    "Reminder updated": ["நினைவூட்டல் புதுப்பிக்கப்பட்டது", "रिमाइंडर अपडेट हुआ"],
    "Reminder deleted": ["நினைவூட்டல் நீக்கப்பட்டது", "रिमाइंडर हटाया गया"],
    "Marked paid": ["செலுத்தியதாகக் குறிக்கப்பட்டது", "भुगतान हुआ चिह्नित"],
    "Marked paid. Next due date set.": ["செலுத்தியதாகக் குறிக்கப்பட்டது. அடுத்த தேதி அமைக்கப்பட்டது.", "भुगतान हुआ चिह्नित। अगली देय तिथि तय हुई।"],
    "Choose a due date.": ["செலுத்த வேண்டிய தேதியைத் தேர்ந்தெடுக்கவும்.", "देय तिथि चुनें।"],
    "Enter a valid amount.": ["சரியான தொகையை உள்ளிடவும்.", "सही राशि दर्ज करें।"],
    "Turn on notifications to be alerted about due payments when you open the app.": ["செயலியைத் திறக்கும்போது செலுத்த வேண்டியவை பற்றி அறிய அறிவிப்புகளை இயக்கவும்.", "ऐप खोलने पर देय भुगतानों की सूचना पाने के लिए सूचनाएँ चालू करें।"],
    "Notifications are on. Due and overdue payments are shown when you open the app.": ["அறிவிப்புகள் இயக்கத்தில் உள்ளன. செயலியைத் திறக்கும்போது செலுத்த வேண்டியவை காட்டப்படும்.", "सूचनाएँ चालू हैं। ऐप खोलने पर देय और बकाया भुगतान दिखाए जाते हैं।"],
    "Notifications are blocked. Allow them in your browser settings.": ["அறிவிப்புகள் தடுக்கப்பட்டுள்ளன. உலாவி அமைப்புகளில் அனுமதிக்கவும்.", "सूचनाएँ रोकी गई हैं। ब्राउज़र सेटिंग्स में अनुमति दें।"],
    "Reminders on. You will be notified when you open the app.": ["நினைவூட்டல்கள் இயக்கத்தில். செயலியைத் திறக்கும்போது அறிவிக்கப்படுவீர்கள்.", "रिमाइंडर चालू। ऐप खोलने पर आपको सूचना मिलेगी।"],
    "This browser does not support notifications.": ["இந்த உலாவி அறிவிப்புகளை ஆதரிக்காது.", "यह ब्राउज़र सूचनाओं का समर्थन नहीं करता।"],

    // Settings
    "Look and feel": ["தோற்றம்", "रूप-रंग"],
    "Diary theme": ["டைரி தீம்", "डायरी थीम"],
    "Rose leather": ["ரோஸ் லெதர்", "रोज़ लेदर"],
    "Champagne": ["ஷாம்பெயின்", "शैम्पेन"],
    "Sage": ["சேஜ்", "सेज"],
    "Midnight": ["நள்ளிரவு", "मध्यरात्रि"],
    "Currency": ["நாணயம்", "मुद्रा"],
    "Your name": ["உங்கள் பெயர்", "आपका नाम"],
    "Categories": ["வகைகள்", "श्रेणियाँ"],
    "Add category": ["வகையைச் சேர்", "श्रेणी जोड़ें"],
    "Edit category": ["வகையைத் திருத்து", "श्रेणी बदलें"],
    "Category added": ["வகை சேர்க்கப்பட்டது", "श्रेणी जोड़ी गई"],
    "Category updated": ["வகை புதுப்பிக்கப்பட்டது", "श्रेणी अपडेट हुई"],
    "Category deleted": ["வகை நீக்கப்பட்டது", "श्रेणी हटाई गई"],
    "Colour": ["நிறம்", "रंग"],
    "Type": ["வகை", "प्रकार"],
    "Expense (counted as spending)": ["செலவு (செலவாகக் கணக்கிடப்படும்)", "खर्च (खर्च के रूप में गिना जाता है)"],
    "Savings (counted as saved)": ["சேமிப்பு (சேமிப்பாகக் கணக்கிடப்படும்)", "बचत (बचत के रूप में गिनी जाती है)"],
    "Words that match this category": ["இந்த வகைக்குப் பொருந்தும் சொற்கள்", "इस श्रेणी से मेल खाने वाले शब्द"],
    "Separate with commas. Used to suggest a category when you type a description.": ["காற்புள்ளிகளால் பிரிக்கவும். விவரம் தட்டச்சு செய்யும்போது வகையைப் பரிந்துரைக்கப் பயன்படும்.", "अल्पविराम से अलग करें। विवरण लिखते समय श्रेणी सुझाने के लिए उपयोग होता है।"],
    "Enter a name.": ["பெயரை உள்ளிடவும்.", "नाम दर्ज करें।"],
    "You already have a category with that name.": ["அந்தப் பெயரில் ஏற்கனவே ஒரு வகை உள்ளது.", "इस नाम की श्रेणी पहले से मौजूद है।"],
    "Account and backup": ["கணக்கு மற்றும் காப்புப் பிரதி", "खाता और बैकअप"],
    "Create an account to back up your diary and use it on more than one device.": ["உங்கள் டைரியைக் காப்புப் பிரதி எடுத்து ஒன்றுக்கு மேற்பட்ட சாதனங்களில் பயன்படுத்த ஒரு கணக்கை உருவாக்கவும்.", "अपनी डायरी का बैकअप लेने और एक से ज़्यादा डिवाइस पर उपयोग करने के लिए खाता बनाएँ।"],
    "Email": ["மின்னஞ்சல்", "ईमेल"],
    "Password": ["கடவுச்சொல்", "पासवर्ड"],
    "At least 8 characters.": ["குறைந்தது 8 எழுத்துகள்.", "कम से कम 8 अक्षर।"],
    "Sign in": ["உள்நுழை", "साइन इन करें"],
    "Sign out": ["வெளியேறு", "साइन आउट करें"],
    "Create account": ["கணக்கை உருவாக்கு", "खाता बनाएँ"],
    "Forgot your password?": ["கடவுச்சொல்லை மறந்துவிட்டீர்களா?", "पासवर्ड भूल गए?"],
    "Please wait…": ["காத்திருக்கவும்…", "कृपया प्रतीक्षा करें…"],
    "Everything is backed up.": ["அனைத்தும் காப்புப் பிரதி எடுக்கப்பட்டுள்ளன.", "सब कुछ बैकअप हो गया है।"],
    "Backup downloaded": ["காப்புப் பிரதி பதிவிறக்கப்பட்டது", "बैकअप डाउनलोड हुआ"],
    "Enter a valid email address.": ["சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.", "सही ईमेल पता दर्ज करें।"],
    "Enter your email first.": ["முதலில் உங்கள் மின்னஞ்சலை உள்ளிடவும்.", "पहले अपना ईमेल दर्ज करें।"],
    "Email or password is incorrect.": ["மின்னஞ்சல் அல்லது கடவுச்சொல் தவறு.", "ईमेल या पासवर्ड गलत है।"],
    "Use a password with at least 8 characters.": ["குறைந்தது 8 எழுத்துகள் கொண்ட கடவுச்சொல்லைப் பயன்படுத்தவும்.", "कम से कम 8 अक्षरों का पासवर्ड उपयोग करें।"],
    "Check your email to confirm your account, then sign in.": ["உங்கள் கணக்கை உறுதிப்படுத்த மின்னஞ்சலைச் சரிபார்த்து, பின்னர் உள்நுழையவும்.", "अपना खाता पुष्टि करने के लिए ईमेल देखें, फिर साइन इन करें।"],
    "If that email has an account, a reset link is on its way.": ["அந்த மின்னஞ்சலுக்குக் கணக்கு இருந்தால், மீட்டமைப்பு இணைப்பு அனுப்பப்படுகிறது.", "अगर उस ईमेल का खाता है, तो रीसेट लिंक भेजा जा रहा है।"],
    "Signed in. Backing up your diary…": ["உள்நுழைந்தீர்கள். உங்கள் டைரி காப்புப் பிரதி எடுக்கப்படுகிறது…", "साइन इन हो गया। आपकी डायरी का बैकअप हो रहा है…"],
    "Signed out. Your data stays on this device.": ["வெளியேறினீர்கள். உங்கள் தரவு இந்த சாதனத்தில் இருக்கும்.", "साइन आउट हो गया। आपका डेटा इस डिवाइस पर रहेगा।"],
    "That file could not be restored.": ["அந்தக் கோப்பை மீட்டெடுக்க முடியவில்லை.", "वह फ़ाइल रीस्टोर नहीं हो सकी।"],
    "That file is too large to be a diary backup.": ["டைரி காப்புப் பிரதியாக இருக்க அந்தக் கோப்பு மிகப் பெரியது.", "डायरी बैकअप होने के लिए वह फ़ाइल बहुत बड़ी है।"],
    "Cloud data deleted": ["கிளவுட் தரவு நீக்கப்பட்டது", "क्लाउड डेटा हटाया गया"],
    "Could not delete cloud data": ["கிளவுட் தரவை நீக்க முடியவில்லை", "क्लाउड डेटा हटाया नहीं जा सका"],
    "Permanently delete ALL your data from the cloud? This cannot be undone.": ["கிளவுடிலிருந்து உங்கள் அனைத்து தரவையும் நிரந்தரமாக நீக்கவா? இதைத் திரும்பப் பெற முடியாது.", "क्लाउड से आपका सारा डेटा हमेशा के लिए हटाएँ? इसे वापस नहीं किया जा सकता।"],
    "Your data and privacy": ["உங்கள் தரவு மற்றும் தனியுரிமை", "आपका डेटा और गोपनीयता"],
    "Your entries are kept on this device. If you sign in, they are also stored in your private cloud account, where only you can read them. Receipts are stored in a private folder.": ["உங்கள் பதிவுகள் இந்த சாதனத்தில் வைக்கப்படுகின்றன. நீங்கள் உள்நுழைந்தால், அவை உங்கள் தனிப்பட்ட கிளவுட் கணக்கிலும் சேமிக்கப்படும், அங்கு நீங்கள் மட்டுமே படிக்க முடியும். ரசீதுகள் தனிப்பட்ட கோப்புறையில் சேமிக்கப்படுகின்றன.", "आपकी प्रविष्टियाँ इस डिवाइस पर रखी जाती हैं। साइन इन करने पर वे आपके निजी क्लाउड खाते में भी सहेजी जाती हैं, जहाँ केवल आप उन्हें पढ़ सकते हैं। रसीदें एक निजी फ़ोल्डर में रखी जाती हैं।"],
    "Automatic tracking": ["தானியங்கி கண்காணிப்பு", "स्वचालित ट्रैकिंग"],
    "ACK Diary never reads your bank or UPI account by itself. These are the ways to bring transactions in, and each needs your action or permission.": ["ACK டைரி உங்கள் வங்கி அல்லது UPI கணக்கைத் தானாக ஒருபோதும் படிக்காது. பரிவர்த்தனைகளைக் கொண்டுவரும் வழிகள் இவை, ஒவ்வொன்றுக்கும் உங்கள் செயல் அல்லது அனுமதி தேவை.", "ACK डायरी आपके बैंक या UPI खाते को खुद कभी नहीं पढ़ती। लेन-देन लाने के ये तरीके हैं, और हर एक के लिए आपकी कार्रवाई या अनुमति चाहिए।"],
    "CSV and Excel statements:": ["CSV மற்றும் Excel அறிக்கைகள்:", "CSV और Excel स्टेटमेंट:"],
    "SMS and email receipts:": ["SMS மற்றும் மின்னஞ்சல் ரசீதுகள்:", "SMS और ईमेल रसीदें:"],
    "Bank and UPI connections:": ["வங்கி மற்றும் UPI இணைப்புகள்:", "बैंक और UPI कनेक्शन:"],
    "Reading SMS automatically:": ["SMS-ஐத் தானாகப் படித்தல்:", "SMS अपने आप पढ़ना:"],
    "Cloud backup is not set up for this copy of the app, so your diary is stored only on this device. Add your Supabase keys to turn it on (see the README).": ["இந்தச் செயலிக்குக் கிளவுட் காப்புப் பிரதி அமைக்கப்படவில்லை, எனவே உங்கள் டைரி இந்த சாதனத்தில் மட்டுமே சேமிக்கப்படுகிறது. அதை இயக்க Supabase விசைகளைச் சேர்க்கவும் (README பார்க்கவும்).", "ऐप की इस कॉपी के लिए क्लाउड बैकअप सेट नहीं है, इसलिए आपकी डायरी केवल इस डिवाइस पर सहेजी जाती है। इसे चालू करने के लिए Supabase कुंजियाँ जोड़ें (README देखें)।"],

    // 404
    "This page could not be found.": ["இந்தப் பக்கம் கிடைக்கவில்லை.", "यह पेज नहीं मिला।"],
    "404: This page could not be found.": ["404: இந்தப் பக்கம் கிடைக்கவில்லை.", "404: यह पेज नहीं मिला।"],
  };

  // Text that starts with one of these is translated at the start and the rest (numbers, dates, names) is kept.
  var PREFIXES = {
    "Financial year ": ["நிதியாண்டு ", "वित्तीय वर्ष "],
    "Good morning": ["காலை வணக்கம்", "सुप्रभात"],
    "Good afternoon": ["மதிய வணக்கம்", "नमस्कार"],
    "Good evening": ["மாலை வணக்கம்", "शुभ संध्या"],
    "Notes for ": ["குறிப்புகள்: ", "नोट्स: "],
    "Daily spending in ": ["தினசரி செலவு: ", "दैनिक खर्च: "],
    "Annual financial summary ": ["ஆண்டு நிதிச் சுருக்கம் ", "वार्षिक वित्तीय सारांश "],
    "Monthly closing statement: ": ["மாத இறுதி அறிக்கை: ", "मासिक समापन विवरण: "],
    "Total planned: ": ["மொத்தத் திட்டம்: ", "कुल योजना: "],
    "Unplanned: ": ["திட்டமிடப்படாதது: ", "अनियोजित: "],
    "Savings rate so far: ": ["இதுவரை சேமிப்பு விகிதம்: ", "अब तक बचत दर: "],
    "Savings rate is ": ["சேமிப்பு விகிதம் ", "बचत दर "],
    "To reach your goal, save about ": ["உங்கள் இலக்கை அடைய, சுமார் இவ்வளவு சேமிக்கவும்: ", "अपना लक्ष्य पाने के लिए, लगभग इतना बचाएँ: "],
    "All time: ": ["எல்லா காலமும்: ", "पूरा समय: "],
    "Week of ": ["வாரம்: ", "सप्ताह: "],
    "Source: ": ["மூலம்: ", "स्रोत: "],
    "Type: ": ["வகை: ", "प्रकार: "],
    "Income ": ["வருமானம் ", "आय "],
    "Spent ": ["செலவு ", "खर्च "],
    "Left ": ["மீதம் ", "बचा "],
    "Over by ": ["அதிகம் ", "अधिक "],
    "In ": ["வரவு ", "आया "],
    "Out ": ["செலவு ", "गया "],
    "Repeats ": ["மீண்டும்: ", "दोहराव: "],
    "Edit ": ["திருத்து ", "बदलें "],
    "Restored ": ["மீட்டெடுக்கப்பட்டது ", "रीस्टोर हुआ "],
    "Category suggested: ": ["பரிந்துரைக்கப்பட்ட வகை: ", "सुझाई गई श्रेणी: "],
    "Sync failed (": ["ஒத்திசைவு தோல்வி (", "सिंक विफल ("],
    "You have spent ": ["நீங்கள் செலவழித்தது ", "आपने खर्च किया "],
    "Great — you are saving ": ["அருமை — நீங்கள் சேமிக்கிறீர்கள் ", "बढ़िया — आप बचा रहे हैं "],
    "You are within budget (": ["நீங்கள் பட்ஜெட்டுக்குள் உள்ளீர்கள் (", "आप बजट के भीतर हैं ("],
    "Largest unusual expense: “": ["மிகப்பெரிய அசாதாரண செலவு: “", "सबसे बड़ा असामान्य खर्च: “"],
    "Nothing to flag for ": ["குறிப்பிட எதுவும் இல்லை: ", "कुछ भी ध्यान देने लायक नहीं: "],
    "No payment reminders for this month. ": ["இந்த மாதத்திற்குக் கட்டண நினைவூட்டல்கள் இல்லை. ", "इस महीने के लिए कोई भुगतान रिमाइंडर नहीं। "],
  };
  var PREFIX_KEYS = Object.keys(PREFIXES).sort(function (a, b) { return b.length - a.length; });
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MONTH_RE = new RegExp("^(" + MONTHS.join("|") + ")(\\s+\\d{4})?$");

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, CODE: 1, PRE: 1, NOSCRIPT: 1, TEMPLATE: 1 };
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];

  var lang = "en";
  try { lang = localStorage.getItem(STORE_KEY) || "en"; } catch (e) {}
  if (!LANGS.some(function (l) { return l.code === lang; })) lang = "en";

  function idx() { return lang === "ta" ? 0 : lang === "hi" ? 1 : -1; }

  function translate(text) {
    var i = idx();
    if (i < 0 || !text) return text;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(text);
    var lead = m[1], core = m[2], trail = m[3];
    if (!core) return text;
    var hit = D[core] || D[text];
    if (hit) return D[text] ? hit[i] : lead + hit[i] + trail;
    var mm = MONTH_RE.exec(core);
    if (mm) return lead + D[mm[1]][i] + (mm[2] || "") + trail;
    for (var k = 0; k < PREFIX_KEYS.length; k++) {
      var p = PREFIX_KEYS[k];
      if (core.indexOf(p) === 0 && core.length > p.length) return lead + PREFIXES[p][i] + core.slice(p.length) + trail;
    }
    return text;
  }

  function skipped(el) {
    for (var n = el; n && n.nodeType === 1; n = n.parentNode) {
      if (SKIP_TAGS[n.tagName] || n.isContentEditable || (n.hasAttribute && n.hasAttribute("data-i18n-skip"))) return true;
    }
    return false;
  }

  var applying = false;

  function doText(node) {
    if (!node.parentNode || skipped(node.parentNode)) return;
    var cur = node.nodeValue;
    // If the app changed the text since we last touched it, the new text is the original.
    if (node.__i18nLast !== cur) node.__i18nOrig = cur;
    var next = translate(node.__i18nOrig);
    if (next !== cur) node.nodeValue = next;
    node.__i18nLast = node.nodeValue;
  }

  function doAttrs(el) {
    if (el.hasAttribute("data-i18n-skip")) return;
    var store = el.__i18nAttrs || (el.__i18nAttrs = {});
    for (var a = 0; a < ATTRS.length; a++) {
      var name = ATTRS[a];
      if (!el.hasAttribute(name)) continue;
      var cur = el.getAttribute(name);
      var rec = store[name] || (store[name] = {});
      if (rec.last !== cur) rec.orig = cur;
      var next = translate(rec.orig);
      if (next !== cur) el.setAttribute(name, next);
      rec.last = el.getAttribute(name);
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) {
      if (skipped(root)) return;
      doAttrs(root);
    }
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (n.nodeType === 1) return SKIP_TAGS[n.tagName] || n.isContentEditable || n.hasAttribute("data-i18n-skip") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var n;
    while ((n = tw.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }

  function applyAll() {
    applying = true;
    try {
      walk(document.body);
      var t = document.title;
      if (document.__i18nTitleLast !== t) document.__i18nTitleOrig = t;
      document.title = translate(document.__i18nTitleOrig);
      document.__i18nTitleLast = document.title;
      var info = LANGS.filter(function (l) { return l.code === lang; })[0];
      document.documentElement.setAttribute("lang", info.htmlLang);
    } finally { applying = false; }
    syncPicker();
  }

  // Language picker
  var picker;
  function buildPicker() {
    var style = document.createElement("style");
    style.textContent =
      "#ack-lang{position:fixed;z-index:45;left:1rem;bottom:6.25rem;display:flex;align-items:center;gap:.35rem;" +
      "background:var(--paper,#fff);color:var(--ink,#222);border:1px solid var(--line,#ddd);border-radius:999px;" +
      "padding:.3rem .5rem .3rem .65rem;box-shadow:0 2px 8px rgba(0,0,0,.12);font:500 13px/1 system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans Tamil','Noto Sans Devanagari',sans-serif}" +
      "#ack-lang svg{flex:none;color:var(--accent,#b24a62)}" +
      "#ack-lang select{appearance:none;-webkit-appearance:none;background:transparent;border:0;color:inherit;font:inherit;padding:.25rem 1rem .25rem .1rem;cursor:pointer;" +
      "background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);" +
      "background-position:calc(100% - 6px) 55%,calc(100% - 2px) 55%;background-size:4px 4px;background-repeat:no-repeat}" +
      "#ack-lang select:focus-visible{outline:2px solid var(--accent,#b24a62);outline-offset:2px;border-radius:6px}" +
      "@media (min-width:768px){#ack-lang{left:16rem;bottom:2rem}}" +
      "@media print{#ack-lang{display:none}}";
    document.head.appendChild(style);

    picker = document.createElement("div");
    picker.id = "ack-lang";
    picker.setAttribute("data-i18n-skip", "");
    picker.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    var sel = document.createElement("select");
    LANGS.forEach(function (l) {
      var o = document.createElement("option");
      o.value = l.code; o.textContent = l.label; o.lang = l.htmlLang;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () {
      lang = sel.value;
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
      applyAll();
    });
    picker.appendChild(sel);
    document.body.appendChild(picker);
  }
  function syncPicker() {
    if (!picker) return;
    var sel = picker.querySelector("select");
    sel.value = lang;
    var label = lang === "ta" ? D.Language[0] : lang === "hi" ? D.Language[1] : "Language";
    sel.setAttribute("aria-label", label);
    sel.title = label;
  }

  function start() {
    buildPicker();
    applyAll();
    var obs = new MutationObserver(function (records) {
      if (picker && !picker.isConnected) document.body.appendChild(picker);
      applying = true;
      try {
        for (var r = 0; r < records.length; r++) {
          var rec = records[r];
          if (rec.type === "characterData") doText(rec.target);
          else if (rec.type === "attributes") { if (rec.target.nodeType === 1 && !skipped(rec.target)) doAttrs(rec.target); }
          else for (var a = 0; a < rec.addedNodes.length; a++) walk(rec.addedNodes[a]);
        }
        if (document.title !== document.__i18nTitleLast) {
          document.__i18nTitleOrig = document.title;
          document.title = translate(document.title);
          document.__i18nTitleLast = document.title;
        }
      } finally { applying = false; }
    });
    obs.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  // Wait until the app has finished starting up so the page is not changed underneath it.
  function later() { setTimeout(start, 150); }
  if (document.readyState === "complete") later();
  else window.addEventListener("load", later, { once: true });
})();
