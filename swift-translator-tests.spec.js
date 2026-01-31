const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

const TEST_DATA = {
  positive: [
    {
      "tcId": "Pos_Fun_001",
      "name": "Convert a short formal greeting",
      "length": "S",
      "input": "suba dhavasak!",
      "expected": "සුබ දවසක්!"
    },
    {
      "tcId": "Pos_Fun_002",
      "name": "Convert a short wellbeing question",
      "length": "S",
      "input": "oyaa hari dha?",
      "expected": "ඔයා හරි ද?"
    },
    {
      "tcId": "Pos_Fun_003",
      "name": "Convert a short present tense daily sentence",
      "length": "S",
      "input": "mama vaeda karanavaa.",
      "expected": "මම වැඩ කරනවා."
    },
    {
      "tcId": "Pos_Fun_004",
      "name": "Convert a short negative sentence",
      "length": "S",
      "input": "mama ennee naee.",
      "expected": "මම එන්නේ නෑ."
    },
    {
      "tcId": "Pos_Fun_005",
      "name": "Convert a polite request question (medium)",
      "length": "M",
      "input": "karuNaakaralaa mata podi udhavvak karanna puluvandha?",
      "expected": "කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුලුවන්ද?"
    },
    {
      "tcId": "Pos_Fun_006",
      "name": "Convert an imperative command",
      "length": "S",
      "input": "issarahata yanna.",
      "expected": "ඉස්සරහට යන්න."
    },
    {
      "tcId": "Pos_Fun_007",
      "name": "Convert a compound sentence joined with 'saha'",
      "length": "M",
      "input": "api kaeema kanavaa saha passee rest karamu.",
      "expected": "අපි කෑම කනවා සහ පස්සේ rest කරමු."
    },
    {
      "tcId": "Pos_Fun_008",
      "name": "Convert a complex conditional sentence",
      "length": "M",
      "input": "oyaa enavanam mama balannam.",
      "expected": "ඔයා එනවනම් මම බලන්නම්."
    },
    {
      "tcId": "Pos_Fun_009",
      "name": "Convert a short pronoun variation (we)",
      "length": "S",
      "input": "api yamu.",
      "expected": "අපි යමු."
    },
    {
      "tcId": "Pos_Fun_010",
      "name": "Convert a plural pronoun sentence (they)",
      "length": "S",
      "input": "eyaalaa enavaa.",
      "expected": "එයාලා එනවා."
    },
    {
      "tcId": "Pos_Fun_011",
      "name": "Convert a past tense sentence",
      "length": "S",
      "input": "mama iiyee gedhara giyaa.",
      "expected": "මම ඊයේ ගෙදර ගියා."
    },
    {
      "tcId": "Pos_Fun_012",
      "name": "Convert a future planning sentence",
      "length": "M",
      "input": "api heta aluth plan ekak hadhamu.",
      "expected": "අපි හෙට අලුත් plan එකක් හදමු."
    },
    {
      "tcId": "Pos_Fun_013",
      "name": "Convert a short 'need' sentence",
      "length": "S",
      "input": "mata bath oonee.",
      "expected": "මට බත් ඕනේ."
    },
    {
      "tcId": "Pos_Fun_014",
      "name": "Convert repeated word emphasis",
      "length": "S",
      "input": "hari hari.",
      "expected": "හරි හරි."
    },
    {
      "tcId": "Pos_Fun_015",
      "name": "Convert mixed Singlish with WiFi term",
      "length": "M",
      "input": "mata WiFi password eka evanna.",
      "expected": "මට WiFi password එක එවන්න."
    },
    {
      "tcId": "Pos_Fun_016",
      "name": "Convert mixed Singlish with Zoom meeting term",
      "length": "M",
      "input": "adha Zoom meeting ekak thiyenavaa.",
      "expected": "අද Zoom meeting එකක් තියෙනවා."
    },
    {
      "tcId": "Pos_Fun_017",
      "name": "Keep place name unchanged",
      "length": "S",
      "input": "api Colombo yamu.",
      "expected": "අපි Colombo යමු."
    },
    {
      "tcId": "Pos_Fun_018",
      "name": "Convert sentence with OTP abbreviation",
      "length": "M",
      "input": "magee OTP eka kiyanna epaa.",
      "expected": "මගේ OTP එක කියන්න එපා."
    },
    {
      "tcId": "Pos_Fun_019",
      "name": "Handle currency format",
      "length": "M",
      "input": "Rs. 2500 vagee.",
      "expected": "Rs. 2500 වගේ."
    },
    {
      "tcId": "Pos_Fun_020",
      "name": "Handle time format in a command",
      "length": "M",
      "input": "7.30 AM vennakan inna.",
      "expected": "7.30 AM වෙන්නකන් ඉන්න."
    },
    {
      "tcId": "Pos_Fun_021",
      "name": "Convert text with brackets and question mark",
      "length": "M",
      "input": "meeka hari nadhdha? (chek karanna).",
      "expected": "මේක හරි නද්ද? (චෙක් කරන්න)."
    },
    {
      "tcId": "Pos_Fun_022",
      "name": "Preserve multiple spaces in input",
      "length": "M",
      "input": "mama gedhara yanavaa.",
      "expected": "මම ගෙදර යනවා."
    },
    {
      "tcId": "Pos_Fun_023",
      "name": "Convert multi-line input with line breaks",
      "length": "M",
      "input": "mama gedhara yanavaa.\noyaa ennee kohomadha?",
      "expected": "මම ගෙදර යනවා.\nඔයා එන්නේ කොහොමද?"
    },
    {
      "tcId": "Pos_Fun_024",
      "name": "Convert long paragraph style input (past tense narrative)",
      "length": "L",
      "input": "mama adha udhaeesanayen paasal giyaa. passee office giyaa. raee 9.00 venakan vaeda kaLaa. iita passe gedhara aavaa, kaema kaalaa nidhaagaththa.",
      "expected": "මම අද උදෑසනයෙන් පාසල් ගියා. පස්සේ office ගියා. රෑ 9.00 වෙනකන් වැඩ කළා. ඊට පස්සෙ ගෙදර ආවා, කැම කාලා නිදාගත්ත."
    }
  ],
  "negative": [
    {
      "tcId": "Neg_Fun_025",
      "name": "Joined words without spaces may cause incorrect segmentation",
      "length": "S",
      "input": "mamagedharayanavaa",
      "expected": "මම ගෙදර යනවා"
    },
    {
      "tcId": "Neg_Fun_026",
      "name": "Common typo may lead to wrong transliteration",
      "length": "S",
      "input": "mata bth onee.",
      "expected": "මට බත් ඕනේ."
    },
    {
      "tcId": "Neg_Fun_027",
      "name": "Slang with stretched letters may distort output",
      "length": "M",
      "input": "elaaa machan, supiriii!",
      "expected": "එලා මචන්, සුපිරි!"
    },
    {
      "tcId": "Neg_Fun_028",
      "name": "High English ratio may confuse conversion flow",
      "length": "M",
      "input": "please mama offz yanna onee, but traffic.",
      "expected": "please මම office යන්න ඕනේ, but traffic."
    },
    {
      "tcId": "Neg_Fun_029",
      "name": "Multiple abbreviations may produce unexpected conversion",
      "length": "M",
      "input": "mama ATM eka langa POS eke pay karanavaa.",
      "expected": "මම ATM එක ලඟ POS එකේ pay කරනවා."
    },
    {
      "tcId": "Neg_Fun_030",
      "name": "Emoji and symbols may break conversion",
      "length": "M",
      "input": "mama happy 🙂 ada!",
      "expected": "මම happy 🙂 අද!"
    },
    {
      "tcId": "Neg_Fun_031",
      "name": "Quotes and mixed punctuation may alter formatting",
      "length": "M",
      "input": "oyaa \"hari\" kiyala kiwwa.",
      "expected": "ඔයා \"හරි\" කියලා කිව්වා."
    },
    {
      "tcId": "Neg_Fun_032",
      "name": "Date format with mixed English may behave incorrectly",
      "length": "M",
      "input": "2026-02-01 wenakan meet wenna.",
      "expected": "2026-02-01 වෙන්නකන් meet වෙන්න."
    },
    {
      "tcId": "Neg_Fun_033",
      "name": "Very long mixed paragraph may cause lag or inaccurate output",
      "length": "L",
      "input": "mama adha gedhara inna gaman, sudden vaessa wahala. oyaa kiyapu nisaa api trip eka cancel kala. ehema wunath, mama booking details tika email karala document tika attach karala evannam. passe api aluth date ekak set karamu, ok da? me paragraph eka long input test ekak widihata danna.",
      "expected": "දිග input එක Sinhala වලට නිවැරදිව හැරවිය යුතුය (දෝෂ නැතිව)."
    },
    {
      "tcId": "Neg_Fun_034",
      "name": "Repeated words without punctuation may cause spacing issues",
      "length": "M",
      "input": "hri hri hri mama yannam",
      "expected": "හරි හරි හරි මම යන්නම්"
    }
  ],
  "ui": {
    "tcId": "Pos_UI_035",
    "name": "Sinhala output updates automatically while typing (real-time)",
    "input": "mama gedhara yanavaa",
    "partialInput": "mama gedha",
    "expectedFull": "While typing, output updates in real-time and final output is: මම ගෙදර යනවා",
    "length": "S"
  }
};
// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
