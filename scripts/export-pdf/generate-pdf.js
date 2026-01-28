const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Check for command line argument
        const inputFile = process.argv[2];
        if (!inputFile) {
            console.error('Error: No input file specified.');
            process.exit(1);
        }

        const htmlFile = path.resolve(process.cwd(), inputFile);
        const pdfFile = htmlFile.replace(/\.html$/i, '.pdf');
        const fileUrl = 'file://' + htmlFile;

        console.log(`Loading ${fileUrl}...`);

        // 1. Set Viewport to 16:9 for consistent rendering before print
        await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

        // 2. Load page and wait for network idle
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });

        // 3. Emulate SCREEN media.
        // This is critical. We do NOT want the browser's default "print stylesheet" to kick in
        // and ruin background colors, gradients, or layouts. We want it to look like the screen.
        await page.emulateMediaType('screen');

        console.log('Preparing slides for PDF export...');

        // 4. Manipulate DOM to stack all slides vertically and ensure they are visible.
        // We do this via JS instead of CSS @media print because it gives us exact control
        // over the "Screen State" of each slide.
        await page.evaluate(() => {
            // Get all slides
            const slides = document.querySelectorAll('.slide');
            const logoHeader = document.querySelector('.logo-header');

            // Container needs to allow flow content
            document.body.style.overflow = 'visible';
            document.body.style.height = 'auto';
            document.body.style.background = 'white'; // Optional: sets backing for PDF

            const container = document.querySelector('.slides-container');
            container.style.height = 'auto';
            container.style.overflow = 'visible';

            // Process each slide
            slides.forEach((slide, index) => {
                // Remove all "hidden" or "inactive" classes/styles
                slide.classList.add('active');
                slide.classList.remove('exit');

                // Force overrides to make it static and visible
                slide.style.position = 'relative'; // Stack vertically
                slide.style.top = 'auto';
                slide.style.left = 'auto';
                slide.style.width = '100%';
                // Force a fixed aspect ratio height (16:9 approx on A4 width)
                // If we want exact 1 pages, we use page-break
                slide.style.height = '1080px'; // Match viewport height
                slide.style.opacity = '1';
                slide.style.transform = 'none';
                slide.style.pointerEvents = 'all';
                slide.style.pageBreakAfter = 'always';
                slide.style.overflow = 'hidden'; // Keep content inside

                // Fix children animations (ensure they are all in "end state")
                const transitions = slide.querySelectorAll('*');
                transitions.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                    el.style.transition = 'none'; // distinct from animation
                    el.style.animation = 'none';
                });

                // Clone Logo Header into this slide?
                // The prompt implies "look most like HTML". 
                // HTML has one fixed header. In PDF, that means it should prob appear on every page.
                if (logoHeader) {
                    const clonedHeader = logoHeader.cloneNode(true);
                    clonedHeader.style.position = 'absolute';
                    clonedHeader.style.top = '30px';
                    clonedHeader.style.left = '40px';
                    clonedHeader.style.width = 'calc(100% - 80px)';
                    clonedHeader.style.zIndex = '1000';
                    clonedHeader.style.display = 'flex';
                    // Append to slide
                    slide.appendChild(clonedHeader);
                }
            });

            // Hide the original global UI elements
            if (logoHeader) logoHeader.style.display = 'none';
            const controls = document.querySelector('.controls');
            if (controls) controls.style.display = 'none';
            const bubbles = document.querySelector('.bubble-container');
            if (bubbles) bubbles.style.display = 'none';
        });

        // 5. Inject a little CSS to ensure the scale fits the PDF page perfectly
        // We use @page to remove margins so our 1080px html content fits
        await page.addStyleTag({
            content: `
                @page {
                    size: 1920px 1080px;
                    margin: 0;
                }
                body {
                    margin: 0;
                    background: white !important; /* Ensure solid backing */
                }
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                
                /* FIX: Text Gradients often fail in PDF/Print. Fallback to solid color for H1 */
                h1 {
                    background: none !important;
                    -webkit-text-fill-color: initial !important; 
                    -webkit-background-clip: initial !important;
                    color: #F0943E !important; /* var(--primary) hardcoded */
                }
            `
        });

        console.log('Generating PDF...');

        await page.pdf({
            path: pdfFile,
            printBackground: true,
            // We set width/height explicitly to match our viewport/slide size
            // This creates a "Native Slide Size" PDF rather than forcing it onto A4 paper.
            // This is usually better for digital presentations.
            width: '1920px',
            height: '1080px',
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            preferCSSPageSize: true
        });

        console.log(`Success! PDF saved to ${pdfFile}`);
        await browser.close();

    } catch (e) {
        console.error('Error generating PDF:', e);
        process.exit(1);
    }
})();
