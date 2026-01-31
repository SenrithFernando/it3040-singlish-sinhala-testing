const { test, expect } = require("@playwright/test");

/**
 * SwiftTranslator - Singlish to Sinhala
 * Uses YOUR filled test cases:
 *  - 24 positive functional (Pos_Fun_*)
 *  - 10 negative functional (Neg_Fun_*)
 *  - 1 UI test (Pos_UI_*)
 *
 * Notes:
 * - The site output is rendered dynamically, so we locate output by class and textContent.
 * - For negative cases, we EXPECT a mismatch from the "ideal expected" output,
 *   so the test passes if actual !== expected.
 */

// -------------------- CONFIG --------------------
const CONFIG = {
  url: "https://www.swifttranslator.com/",
  timeouts: {
    pageReady: 8000,
    afterClear: 700,
    translationMax: 15000,
    betweenTests: 400,
  },
  selectors: {
    // Input: SwiftTranslator uses a textarea (first textarea is input)
    inputTextarea: "textarea",

    // Output container class seen on the site (from your earlier approach)
    outputDiv:
      "div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap",
  },
};

// -------------------- YOUR TEST CASES (from your filled sheet) --------------------
const TEST_DATA = {
  positive: [
    {
      "tcId": "Pos_Fun_0101",
      "name": "Convert a short formal greeting",
      "length": "S",
      "input": "suba dhavasak!",
      "expected": "සුබ දවසක්!"
    },
    {
      "tcId": "Pos_Fun_0102",
      "name": "Convert a short wellbeing question",
      "length": "S",
      "input": "oyaa hari dha?",
      "expected": "ඔයා හරි ද?"
    },
    {
      "tcId": "Pos_Fun_0103",
      "name": "Convert a short present tense daily sentence",
      "length": "S",
      "input": "mama vaeda karanavaa.",
      "expected": "මම වැඩ කරනවා."
    },
    {
      "tcId": "Pos_Fun_0104",
      "name": "Convert a short negative sentence",
      "length": "S",
      "input": "mama ennee naee.",
      "expected": "මම එන්නේ නෑ."
    },
    {
      "tcId": "Pos_Fun_0105",
      "name": "Convert a polite request question (medium)",
      "length": "M",
      "input": "karuNaakaralaa mata podi udhavvak karanna puluvandha?",
      "expected": "කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුලුවන්ද?"
    },
    {
      "tcId": "Pos_Fun_0106",
      "name": "Convert an imperative command",
      "length": "S",
      "input": "issarahata yanna.",
      "expected": "ඉස්සරහට යන්න."
    },
    {
      "tcId": "Pos_Fun_0107",
      "name": "Convert a compound sentence joined with 'saha'",
      "length": "M",
      "input": "api kaeema kanavaa saha passee rest karamu.",
      "expected": "අපි කෑම කනවා සහ පස්සේ rest කරමු."
    },
    {
      "tcId": "Pos_Fun_0108",
      "name": "Convert a complex conditional sentence",
      "length": "M",
      "input": "oyaa enavanam mama balannam.",
      "expected": "ඔයා එනවනම් මම බලන්නම්."
    },
    {
      "tcId": "Pos_Fun_0109",
      "name": "Convert a short pronoun variation (we)",
      "length": "S",
      "input": "api yamu.",
      "expected": "අපි යමු."
    },
    {
      "tcId": "Pos_Fun_0110",
      "name": "Convert a plural pronoun sentence (they)",
      "length": "S",
      "input": "eyaalaa enavaa.",
      "expected": "එයාලා එනවා."
    },
    {
      "tcId": "Pos_Fun_0111",
      "name": "Convert a past tense sentence",
      "length": "S",
      "input": "mama iiyee gedhara giyaa.",
      "expected": "මම ඊයේ ගෙදර ගියා."
    },
    {
      "tcId": "Pos_Fun_0112",
      "name": "Convert a future planning sentence",
      "length": "M",
      "input": "api heta aluth plan ekak hadhamu.",
      "expected": "අපි හෙට අලුත් plan එකක් හදමු."
    },
    {
      "tcId": "Pos_Fun_0113",
      "name": "Convert a short 'need' sentence",
      "length": "S",
      "input": "mata bath oonee.",
      "expected": "මට බත් ඕනේ."
    },
    {
      "tcId": "Pos_Fun_0114",
      "name": "Convert repeated word emphasis",
      "length": "S",
      "input": "hari hari.",
      "expected": "හරි හරි."
    },
    {
      "tcId": "Pos_Fun_0115",
      "name": "Convert mixed Singlish with WiFi term",
      "length": "M",
      "input": "mata WiFi password eka evanna.",
      "expected": "මට WiFi password එක එවන්න."
    },
    {
      "tcId": "Pos_Fun_0116",
      "name": "Convert mixed Singlish with Zoom meeting term",
      "length": "M",
      "input": "adha Zoom meeting ekak thiyenavaa.",
      "expected": "අද Zoom meeting එකක් තියෙනවා."
    },
    {
      "tcId": "Pos_Fun_0117",
      "name": "Keep place name unchanged",
      "length": "S",
      "input": "api Colombo yamu.",
      "expected": "අපි Colombo යමු."
    },
    {
      "tcId": "Pos_Fun_0118",
      "name": "Convert sentence with OTP abbreviation",
      "length": "M",
      "input": "magee OTP eka kiyanna epaa.",
      "expected": "මගේ OTP එක කියන්න එපා."
    },
    {
      "tcId": "Pos_Fun_0119",
      "name": "Handle currency format",
      "length": "M",
      "input": "Rs. 2500 vagee.",
      "expected": "Rs. 2500 වගේ."
    },
    {
      "tcId": "Pos_Fun_0120",
      "name": "Handle time format in a command",
      "length": "M",
      "input": "7.30 AM vennakan inna.",
      "expected": "7.30 AM වෙන්නකන් ඉන්න."
    },
    {
      "tcId": "Pos_Fun_0121",
      "name": "Convert text with brackets and question mark",
      "length": "M",
      "input": "meeka hari nadhdha? (chek karanna).",
      "expected": "මේක හරි නද්ද? (චෙක් කරන්න)."
    },
    {
      "tcId": "Pos_Fun_0122",
      "name": "Preserve multiple spaces in input",
      "length": "M",
      "input": "mama gedhara yanavaa.",
      "expected": "මම ගෙදර යනවා."
    },
    {
      "tcId": "Pos_Fun_0123",
      "name": "Convert multi-line input with line breaks",
      "length": "M",
      "input": "mama gedhara yanavaa.\noyaa ennee kohomadha?",
      "expected": "මම ගෙදර යනවා.\nඔයා එන්නේ කොහොමද?"
    },
    {
      "tcId": "Pos_Fun_0124",
      "name": "Convert long paragraph style input (past tense narrative)",
      "length": "L",
      "input": "mama adha udhaeesanayen paasal giyaa. passee office giyaa. raee 9.00 venakan vaeda kaLaa. iita passe gedhara aavaa, kaema kaalaa nidhaagaththa.",
      "expected": "මම අද උදෑසනයෙන් පාසල් ගියා. පස්සේ office ගියා. රෑ 9.00 වෙනකන් වැඩ කළා. ඊට පස්සේ ගෙදර ආවා, කෑම කාලා නිදාගත්ත."
    }
  ],
  "negative": [
    {
      "tcId": "Neg_Fun_0201",
      "name": "Joined words without spaces may cause incorrect segmentation",
      "length": "S",
      "input": "mamagedharayanavaa",
      "expected": "මම ගෙදර යනවා"
    },
    {
      "tcId": "Neg_Fun_0202",
      "name": "Common typo may lead to wrong transliteration",
      "length": "S",
      "input": "mata bth onee.",
      "expected": "මට බත් ඕනේ."
    },
    {
      "tcId": "Neg_Fun_0203",
      "name": "Slang with stretched letters may distort output",
      "length": "M",
      "input": "elaaa machan, supiriii!",
      "expected": "එලා මචන්, සුපිරි!"
    },
    {
      "tcId": "Neg_Fun_0204",
      "name": "High English ratio may confuse conversion flow",
      "length": "M",
      "input": "please mama offz yanna onee, but traffic.",
      "expected": "please මම office යන්න ඕනේ, but traffic."
    },
    {
      "tcId": "Neg_Fun_0205",
      "name": "Multiple abbreviations may produce unexpected conversion",
      "length": "M",
      "input": "mama ATM eka langa POS eke pay karanavaa.",
      "expected": "මම ATM එක ලඟ POS එකේ pay කරනවා."
    },
    {
      "tcId": "Neg_Fun_0206",
      "name": "Emoji and symbols may break conversion",
      "length": "M",
      "input": "mama happy 🙂 ada!",
      "expected": "මම happy 🙂 අද!"
    },
    {
      "tcId": "Neg_Fun_0207",
      "name": "Quotes and mixed punctuation may alter formatting",
      "length": "M",
      "input": "oyaa \"hari\" kiyala kiwwa.",
      "expected": "ඔයා \"හරි\" කියලා කිව්වා."
    },
    {
      "tcId": "Neg_Fun_0208",
      "name": "Date format with mixed English may behave incorrectly",
      "length": "M",
      "input": "2026-02-01 wenakan meet wenna.",
      "expected": "2026-02-01 වෙන්නකන් meet වෙන්න."
    },
    {
      "tcId": "Neg_Fun_0209",
      "name": "Very long mixed paragraph may cause lag or inaccurate output",
      "length": "L",
      "input": "mama adha gedhara inna gaman, sudden vaessa wahala. oyaa kiyapu nisaa api trip eka cancel kala. ehema wunath, mama booking details tika email karala document tika attach karala evannam. passe api aluth date ekak set karamu, ok da? me paragraph eka long input test ekak widihata danna.",
      "expected": "දිග input එක Sinhala වලට නිවැරදිව හැරවිය යුතුය (දෝෂ නැතිව)."
    },
    {
      "tcId": "Neg_Fun_0210",
      "name": "Repeated words without punctuation may cause spacing issues",
      "length": "M",
      "input": "hri hri hri mama yannam",
      "expected": "හරි හරි හරි මම යන්නම්"
    }
  ],
  "ui": {
    "tcId": "Pos_UI_0301",
    "name": "Sinhala output updates automatically while typing (real-time)",
    "input": "mama gedhara yanavaa",
    "partialInput": "mama gedha",
    "expectedFull": "While typing, output updates in real-time and final output is: මම ගෙදර යනවා",
    "length": "S"
  }
};

// -------------------- HELPERS --------------------
function normalizeText(t) {
  return (t || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// -------------------- PAGE OBJECT --------------------
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(CONFIG.url, { waitUntil: "domcontentloaded" });
    await this.page.waitForTimeout(500);
    // Sometimes networkidle hangs on this site, so keep it light.
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(700);
  }

  inputField() {
    // SwiftTranslator: first textarea is the input
    return this.page.locator(CONFIG.selectors.inputTextarea).first();
  }

  outputCandidates() {
    return this.page.locator(CONFIG.selectors.outputDiv);
  }

  async clearInput() {
    const input = this.inputField();
    await input.click();
    await input.fill("");
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = this.inputField();
    await input.click();
    await input.fill(text);
  }

  async getBestOutputLocator() {
    // Pick the first output div that is not empty (after typing).
    const candidates = this.outputCandidates();
    const count = await candidates.count();
    for (let i = 0; i < count; i++) {
      const el = candidates.nth(i);
      const txt = normalizeText(await el.textContent());
      if (txt.length > 0) return el;
    }
    // fallback: first candidate
    return candidates.first();
  }

  async waitForOutputChange(prevText = "") {
    const prev = normalizeText(prevText);

    await this.page.waitForFunction(
      ({ selector, prev }) => {
        const nodes = Array.from(document.querySelectorAll(selector));
        const texts = nodes
          .map((n) => (n.textContent || "").replace(/\r\n/g, "\n").trim())
          .filter((t) => t.length > 0);

        if (texts.length === 0) return false;

        // any output different from previous
        return texts.some((t) => t !== prev);
      },
      { selector: CONFIG.selectors.outputDiv, prev },
      { timeout: CONFIG.timeouts.translationMax }
    );
  }

  async readOutput() {
    const output = await this.getBestOutputLocator();
    return normalizeText(await output.textContent());
  }

  async translate(text) {
    const before = await this.readOutput().catch(() => "");
    await this.clearInput();
    await this.typeInput(text);
    await this.waitForOutputChange(before);
    await this.page.waitForTimeout(700); // settle
    return await this.readOutput();
  }
}

// -------------------- TESTS --------------------
test.describe("SwiftTranslator - Singlish to Sinhala (Your Test Cases)", () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigate();
  });

  // ✅ Positive Functional Tests (expect exact match after normalization)
  test.describe("Positive Functional Tests", () => {
    for (const tc of TEST_DATA.positive) {
      test(`${tc.tcId} - ${tc.name}`, async () => {
        const actual = await translator.translate(tc.input);

        console.log(`\n[${tc.tcId}] INPUT: ${tc.input}`);
        console.log(`[${tc.tcId}] EXPECTED: ${tc.expected}`);
        console.log(`[${tc.tcId}] ACTUAL:   ${actual}\n`);

        expect(normalizeText(actual)).toBe(normalizeText(tc.expected));
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // ❌ Negative Functional Tests
  // We expect the system to FAIL (mismatch) compared to the "ideal expected".
  // So the test PASSES if actual != expected (or actual empty).
  test.describe("Negative Functional Tests (expected mismatch)", () => {
    for (const tc of TEST_DATA.negative) {
      test(`${tc.tcId} - ${tc.name}`, async () => {
        const actual = await translator.translate(tc.input);

        console.log(`\n[${tc.tcId}] INPUT: ${tc.input}`);
        console.log(`[${tc.tcId}] IDEAL EXPECTED: ${tc.expected}`);
        console.log(`[${tc.tcId}] ACTUAL:         ${actual}\n`);

        expect(normalizeText(actual)).not.toBe(normalizeText(tc.expected));
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // ✅ UI Test - Real-time update while typing
  test.describe("UI Functionality Tests", () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async () => {
      const input = translator.inputField();

      await translator.clearInput();

      // Type partial input slowly
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 120 });
      await translator.page.waitForTimeout(800);

      // Confirm some output appears
      const partialOut = await translator.readOutput();
      expect(partialOut.length).toBeGreaterThan(0);

      // Finish typing
      const rest = TEST_DATA.ui.input.slice(TEST_DATA.ui.partialInput.length);
      await input.pressSequentially(rest, { delay: 120 });

      // Wait and verify final output
      await translator.waitForOutputChange(partialOut);
      const finalOut = await translator.readOutput();

      console.log(`\n[${TEST_DATA.ui.tcId}] PARTIAL OUTPUT: ${partialOut}`);
      console.log(`[${TEST_DATA.ui.tcId}] FINAL OUTPUT:   ${finalOut}\n`);

      expect(normalizeText(finalOut)).toContain(normalizeText(TEST_DATA.ui.expectedFull));
    });
  });
});
