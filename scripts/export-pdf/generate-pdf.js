const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Path to your HTML file
        // Path to your HTML file
        // Check for command line argument
        const inputFile = process.argv[2];
        if (!inputFile) {
            console.error('Error: No input file specified.');
            process.exit(1);
        }

        const htmlFile = path.resolve(process.cwd(), inputFile);

        // Build PDF path
        const pdfFile = htmlFile.replace(/\.html$/i, '.pdf');

        // Convert to file URL for local loading
        const fileUrl = 'file://' + htmlFile;

        console.log(`Loading ${fileUrl}...`);
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });

        // Set screen size to reasonable default just in case
        await page.setViewport({ width: 1920, height: 1080 });

        // INJECT PRINT STYLES
        // This is critical because the original CSS hides non-active slides (opacity: 0, pointer-events: none)
        // and positions them absolutely on top of each other.
        // We need to un-stack them for the PDF and make them all visible.
        await page.addStyleTag({
            content: `
                @media print {
                    @page {
                        size: 297mm 210mm; /* A4 Landscape or 16:9 ratio approximately */
                        margin: 0;
                    }

                    body {
                        overflow: visible !important;
                        height: auto !important;
                        width: auto !important;
                        background: white !important;
                    }

                    .slides-container {
                        position: relative !important;
                        height: auto !important;
                        width: 100% !important;
                        display: block !important;
                    }

                    .slide {
                        /* Reset absolute positioning */
                        position: relative !important;
                        top: auto !important;
                        left: auto !important;
                        
                        /* Force Dimensions for Print Page */
                        width: 297mm !important;
                        height: 210mm !important; 
                        page-break-after: always !important;
                        
                        /* Make all visible */
                        opacity: 1 !important;
                        transform: none !important;
                        display: flex !important;
                        
                        /* Ensure background renders */
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    /* Force content inside slides to be visible/animated-in */
                    .slide li, 
                    .slide .phase-card,
                    .slide .feature-item {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                    }

                    /* Hide Controls */
                    .controls, 
                    .bubble-container,
                    .logo-header {
                       /* Keep logo header if desired? Usually absolute pos might break flow in print stack.
                          Let's hide global logo header and rely on slide content, or check if it duplicates.
                          The global header in the HTML is absolute. If we keep it, it might print on every page 
                          or just the first one depending on browser implementation of fixed/absolute in print.
                          Safest to hide for clean slides, or try to keep if it works.
                          Let's hide it for now to avoid cluttering or overlap.*/
                       display: none !important;
                    }
                }
            `
        });

        console.log('Generating PDF...');
        await page.pdf({
            path: pdfFile,
            printBackground: true,
            format: 'A4',
            landscape: true,
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        });

        console.log(`Success! PDF saved to ${pdfFile}`);

        await browser.close();

    } catch (e) {
        console.error('Error generating PDF:', e);
        process.exit(1);
    }
})();
