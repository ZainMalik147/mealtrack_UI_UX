import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Suppress headers/footers on cover page

        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Running Header
        self.drawString(54, 755, "MEALTRACK MULTI-TENANT SAAS — OFFICIAL USER MANUAL & OPERATIONS GUIDE")
        self.drawRightString(612 - 54, 755, "HARPER WOODS SCHOOLS & IDEAL TECH")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 747, 612 - 54, 747)

        # Running Footer
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 45, 612 - 54, 45)
        self.setFont("Helvetica", 8)
        self.drawString(54, 32, "Confidential USDA / MDE CEP School Nutrition Records · Phase 1 Implementation")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 32, page_str)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=colors.HexColor('#0F1F38'),
        alignment=0,
        spaceAfter=10
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=colors.HexColor('#6B1719'),
        alignment=0,
        spaceAfter=25
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor('#0F1F38'),
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0A7E8C'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'H3',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        leftIndent=15,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#0F172A')
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0F172A')
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#334155')
    )

    story = []

    # ==================== COVER PAGE ====================
    story.append(Spacer(1, 40))
    story.append(Paragraph("MEALTRACK MULTI-TENANT SAAS", ParagraphStyle('CoverBadge', fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#0A7E8C'), spaceAfter=8)))
    story.append(Paragraph("Comprehensive User Manual & Technical Operations Guide", title_style))
    story.append(Paragraph("Phase 1 System Release: Daily Classroom Meal Registers, Passwordless Parent Portal, Kitchen Production Board & Multi-Tenant Super-Portal", subtitle_style))
    
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#6B1719'), spaceAfter=20))

    # Document Control Metadata Table
    meta_data = [
        [Paragraph("<b>Target Product:</b>", table_header_style), Paragraph("MealTrack SaaS Platform (Phase 1)", table_cell_style)],
        [Paragraph("<b>Vendor / Developer:</b>", table_header_style), Paragraph("Ideal Technology Solutions, LLC (Michael Collins)", table_cell_style)],
        [Paragraph("<b>Client District:</b>", table_header_style), Paragraph("Harper Woods Schools (Beacon & Tyrone Elementary)", table_cell_style)],
        [Paragraph("<b>Food Service Director:</b>", table_header_style), Paragraph("Brian Corbett (bcorbett@hwschools.org)", table_cell_style)],
        [Paragraph("<b>Design Philosophy:</b>", table_header_style), Paragraph("Ultra-Clean & Plain (Apple/Linear Simplicity, 23 Single-Purpose Pages)", table_cell_style)],
        [Paragraph("<b>Regulatory Mandate:</b>", table_header_style), Paragraph("USDA Community Eligibility Provision (CEP) & MDE CACFP Regulations", table_cell_style)],
        [Paragraph("<b>Document Version:</b>", table_header_style), Paragraph("Version 1.0.0 (Phase 1 Final Sign-off)", table_cell_style)],
        [Paragraph("<b>Publication Date:</b>", table_header_style), Paragraph("November 2026", table_cell_style)],
    ]
    meta_table = Table(meta_data, colWidths=[140, 364])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#E2E8F0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)

    story.append(Spacer(1, 40))
    story.append(Paragraph("<b>CONFIDENTIALITY NOTICE:</b> This documentation contains proprietary operational workflows, regulatory compliance specifications, and software architecture details developed for Harper Woods Community Schools and Ideal Technology Solutions, LLC. Unauthorized duplication or redistribution is strictly prohibited.", ParagraphStyle('Notice', fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#64748B'))))

    story.append(PageBreak())

    # ==================== TABLE OF CONTENTS & OVERVIEW ====================
    story.append(Paragraph("Table of Contents", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=12))

    toc_items = [
        ("Section 1: Global Design System & Foundation Rules", "Page 3"),
        ("Section 2: Group A — Teacher Morning Workflow (Pages 1 to 5)", "Page 4"),
        ("Section 3: GSRP Pre-K Family Style Workflow (Room 101)", "Page 6"),
        ("Section 4: Group B — Parent Mobile Magic Link (Pages 6 to 9)", "Page 7"),
        ("Section 5: Group C — Master Super-Portal Administration (Pages 10 to 14)", "Page 8"),
        ("Section 6: Group D — Client District Admin Console (Pages 15 to 17)", "Page 10"),
        ("Section 7: Group E — Food Service & Kitchen Line Operations (Pages 18 to 20)", "Page 11"),
        ("Section 8: Group F — Special States, Communication & Lockout (Pages 21 to 23)", "Page 13"),
        ("Section 9: Legal Attestation & USDA/MDE CEP Compliance Framework", "Page 14"),
        ("Section 10: Technical Architecture, State Management & .NET Core Roadmap", "Page 15"),
    ]
    toc_data = [[Paragraph(f"<b>{t[0]}</b>", table_cell_style), Paragraph(t[1], ParagraphStyle('TOCPage', fontName='Helvetica-Bold', fontSize=8.5, alignment=2, textColor=colors.HexColor('#0A7E8C')))] for t in toc_items]
    toc_table = Table(toc_data, colWidths=[420, 84])
    toc_table.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor('#F1F5F9')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(toc_table)
    story.append(Spacer(1, 15))

    story.append(Paragraph("Executive Overview & Purpose", h1_style))
    story.append(Paragraph(
        "MealTrack is an enterprise web-based nutrition management software built by <b>Ideal Technology Solutions, LLC</b> for K–12 public school districts. Prior to MealTrack, classroom meal counts at Harper Woods Schools took elementary teachers between 45 to 60 minutes every morning via fragmented paper sheets and manual tallies. MealTrack reduces this entire workflow to under 10 minutes while providing cafeteria staff with real-time, sub-second visibility into preparation quantities.",
        body_style
    ))
    story.append(Paragraph(
        "Because Harper Woods Schools participates in the <b>Community Eligibility Provision (CEP)</b>, 100% of enrolled students eat breakfast and lunch at zero charge. However, strict state (MDE) and federal (USDA) reimbursement regulations demand daily certified counts, meal choices, classroom breakfast vs. cafeteria lunch tracking, and completed Title I Educational Benefit surveys.",
        body_style
    ))

    story.append(PageBreak())

    # ==================== SECTION 1: GLOBAL DESIGN SYSTEM ====================
    story.append(Paragraph("Section 1: Global Design System & Foundation Rules", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "The MealTrack user interface is crafted under the <b>'Ultra-Clean & Plain'</b> design doctrine. Inspired by Apple and Linear software products, every screen emphasizes low cognitive load, high contrast, generous whitespace, and focused single-purpose views.",
        body_style
    ))

    design_rules = [
        [Paragraph("<b>Element</b>", table_header_style), Paragraph("<b>Specification</b>", table_header_style), Paragraph("<b>Operational Purpose</b>", table_header_style)],
        [Paragraph("Neutral Canvas", table_cell_style), Paragraph("Crisp Light Gray (#F8FAFC) & Pure White (#FFFFFF)", table_cell_style), Paragraph("Zero visual noise; soft on teacher eyes during early morning hours.", table_cell_style)],
        [Paragraph("Borders & Dividers", table_cell_style), Paragraph("Subtle Slate (#E2E8F0), 1px solid", table_cell_style), Paragraph("Provides structural card containment without heavy lines.", table_cell_style)],
        [Paragraph("Typography", table_cell_style), Paragraph("Headers: Dark Slate (#0F172A)<br/>Body: Muted Slate (#64748B)", table_cell_style), Paragraph("Meets WCAG AAA contrast ratios for accessibility across all tablets.", table_cell_style)],
        [Paragraph("Brand Accents", table_cell_style), Paragraph("Master: Navy (#0F1F38)<br/>District: Maroon (#6B1719)<br/>Actions: Teal (#0A7E8C)", table_cell_style), Paragraph("Instantly identifies portal context (Vendor vs. Client District vs. CTA).", table_cell_style)],
        [Paragraph("Status Palette", table_cell_style), Paragraph("Present: #059669 | Late: #D97706<br/>Leave Late: #4F46E5 | Absent: #DC2626", table_cell_style), Paragraph("Unambiguous semantic coloring across registers and kitchen boards.", table_cell_style)],
        [Paragraph("Density Rule", table_cell_style), Paragraph("Maximum 4 to 6 functional objects per view", table_cell_style), Paragraph("Prevents decision fatigue; broken into 23 dedicated micro-pages.", table_cell_style)],
        [Paragraph("Touch Targets", table_cell_style), Paragraph("Minimum 44px (Buttons 48px–52px)", table_cell_style), Paragraph("Guarantees fast fingertip accuracy on iPads and Chromebooks.", table_cell_style)],
        [Paragraph("Corner Radius", table_cell_style), Paragraph("Cards: 12px | Buttons & Inputs: 8px", table_cell_style), Paragraph("Modern, approachable Apple-standard geometric curvature.", table_cell_style)],
    ]
    design_table = Table(design_rules, colWidths=[100, 190, 214])
    design_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(design_table)

    story.append(Spacer(1, 15))
    story.append(Paragraph("Architectural Division: 23 Dedicated Micro-Pages", h2_style))
    story.append(Paragraph(
        "Rather than overloading users with sprawling multi-tab dashboards, MealTrack divides every journey into focused steps:",
        body_style
    ))
    story.append(Paragraph("• <b>Group A (Pages 1–5):</b> Elementary teacher morning workflow (Overview → Attendance → Meals → Extended Care → e-Signature).", bullet_style))
    story.append(Paragraph("• <b>Group B (Pages 6–9):</b> Mobile-first parent experience (SMS Welcome → SNAP Survey → e-Signature → Weekly Pre-Selection).", bullet_style))
    story.append(Paragraph("• <b>Group C (Pages 10–14):</b> SaaS vendor super-portal (Client Directory → 3-Step District Onboarding → Telemetry).", bullet_style))
    story.append(Paragraph("• <b>Group D (Pages 15–17):</b> District administration (Food Service Executive Home → Staff Directory → Invite Form).", bullet_style))
    story.append(Paragraph("• <b>Group E (Pages 18–20):</b> Cafeteria operations (10-Foot Glanceable Prep Board → Change Alerts Feed → Benefit Form Approval Desk).", bullet_style))
    story.append(Paragraph("• <b>Group F (Pages 21–23):</b> Special states (License Lockout Screen → Daily 9:00 AM Master Email → Urgent Change SMS Card).", bullet_style))

    story.append(PageBreak())

    # ==================== SECTION 2: GROUP A ====================
    story.append(Paragraph("Section 2: Group A — Teacher Morning Workflow (Pages 1 to 5)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "Elementary educators (exemplified by Mrs. Jennifer Ellis in Beacon Elementary Room 205, Grade 2) utilize Group A to record daily counts before 9:00 AM.",
        body_style
    ))

    # Page 1
    story.append(Paragraph("Page 1: Teacher Classroom Morning Hub", h2_style))
    story.append(Paragraph("<b>Primary Purpose:</b> Distraction-free launchpad providing immediate awareness of cut-off timing and missing household benefit forms.", body_style))
    story.append(Paragraph("• <b>Live Cut-off Timer Card:</b> Displays real-time countdown to 9:00 AM (e.g. '8:42 AM — 18 minutes remaining until 9:00 AM count cut-off'). After 9:00 AM, shifts to an amber warning informing the teacher that submitted counts are marked 'Submitted Late'.", bullet_style))
    story.append(Paragraph("• <b>Quick Metric Bar:</b> 4 simple status pills displaying Total Enrolled (24), Submitted Yesterday (24), Missing Benefit Forms (2), and CEP Free Status (100%).", bullet_style))
    story.append(Paragraph("• <b>Single High-Contrast Button:</b> Large 52px Teal button ('Start Morning Count (24 Students) →') initiating the 3-step sequence.", bullet_style))
    story.append(Paragraph("• <b>History Link:</b> Subtle link at the bottom opening past certified submission timestamps.", bullet_style))

    # Page 2
    story.append(Paragraph("Page 2: Student Quick-Attendance Step (Attendance Only)", h2_style))
    story.append(Paragraph("<b>Header:</b> 'Step 1 of 3: Mark Morning Attendance' with progress bar at 33%.", body_style))
    story.append(Paragraph("<b>Batch Action:</b> '[ Mark All Present ]' ghost button sets all 24 students to Present with one tap.", body_style))
    story.append(Paragraph("<b>Student Row Structure:</b> 16px spacious padding, student photo avatar, full legal name ('Amari Johnson'), 8-digit MiStar ID (#84729103), and allergy flags.", body_style))
    story.append(Paragraph("<b>4-Button Segmented Selector:</b>", h3_style))
    story.append(Paragraph("1. <b>[ Present ]:</b> Green accent. Indicates child is currently seated in classroom.", bullet_style))
    story.append(Paragraph("2. <b>[ Late ]:</b> Amber accent. Tapping prompts for arrival time (defaults to 9:08 AM). Classroom breakfast is automatically flagged as 'Missed/Not Taken'.", bullet_style))
    story.append(Paragraph("3. <b>[ Leave Late ]:</b> Indigo accent. Automatically tags student for Latchkey or After-School Tutoring/Art Studio.", bullet_style))
    story.append(Paragraph("4. <b>[ Absent ]:</b> Soft Red accent. Excludes child from lunch prep lines unless a late update is later transmitted.", bullet_style))
    story.append(Paragraph("<b>Footer:</b> Sticky button: 'Continue to Meal Choices (23 Present/Late) →'.", body_style))

    # Page 3
    story.append(Paragraph("Page 3: Student Meal Choices Step (Meals Only)", h2_style))
    story.append(Paragraph("<b>Header:</b> 'Step 2 of 3: Record Meal Choices' with progress bar at 66%. Shows present and late students only.", body_style))
    story.append(Paragraph("<b>Batch Action:</b> '[ Fill Remaining with Hot Entrée A ]' instantly assigns the primary entree to all unfilled rows.", body_style))
    story.append(Paragraph("<b>Per-Student Selection Controls:</b>", h3_style))
    story.append(Paragraph("• <b>Breakfast Row:</b> (•) Served  ( ) Did Not Take. Disabled and defaulted to 'Did Not Take' if student arrived late.", bullet_style))
    story.append(Paragraph("• <b>Lunch Row (5 Distinct Pills):</b>", bullet_style))
    story.append(Paragraph("   - <b>[ Hot Entrée A ]:</b> Golden Chicken Strips (Halal certified).", bullet_style))
    story.append(Paragraph("   - <b>[ Cold Entrée B ]:</b> Cheesy Italian Flatbread pre-pack.", bullet_style))
    story.append(Paragraph("   - <b>[ Salad Bar ]:</b> Fresh Garden Salad Bowl with roll.", bullet_style))
    story.append(Paragraph("   - <b>[ Own Lunch ]:</b> Student brought personal lunch from home (counts as 0 meal prep, milk only).", bullet_style))
    story.append(Paragraph("   - <b>[ 🚫 Did Not Take Meal ]:</b> High-visibility red button for students fasting (e.g. Ramadan) or skipping meal.", bullet_style))

    # Page 4
    story.append(Paragraph("Page 4: Extended Day & Leave Late Check (After-Care Only)", h2_style))
    story.append(Paragraph("<b>Header:</b> 'Step 3 of 3: Confirm After-School Snack & Supper' with progress bar at 100%.", body_style))
    story.append(Paragraph("<b>Content:</b> Filtered roster displaying exclusively children marked as 'Leave Late' or enrolled in after-school programs (Latchkey, Tutoring, Art Studio). Table features 4 columns: Student Name | Stay Reason | Snack [✓/✕] | Supper [✓/✕].", body_style))

    # Page 5
    story.append(Paragraph("Page 5: Digital Signature & Legal Attestation", h2_style))
    story.append(Paragraph("<b>Visual Design:</b> Styled as clean white certified paper on soft gray backdrop.", body_style))
    story.append(Paragraph("• <b>Summary Box:</b> Present (21), Late Arrivals (2), Leave Late (4), Absent (1). Total Meals to Prepare (20): Hot A (11), Cold B (6), Salad (3), Own Lunch (2), Did Not Take (2).", bullet_style))
    story.append(Paragraph("• <b>Legal Attestation Declaration:</b> 'I certify that this record is accurate in accordance with MDE and USDA CEP regulations.'", bullet_style))
    story.append(Paragraph("• <b>Typed Signature Input:</b> Pre-filled with authenticated Google SSO identity ('Jennifer M. Ellis').", bullet_style))
    story.append(Paragraph("• <b>Digital Timestamp:</b> Stamped with current date, time (8:48 AM EST), client IP (10.42.1.88), and SHA-256 seal.", bullet_style))
    story.append(Paragraph("• <b>Primary Action:</b> 'Transmit Certified Count to Kitchen Line 🚀'. Submits record, pushes delta to kitchen, and emits confetti celebration.", bullet_style))

    story.append(PageBreak())

    # ==================== SECTION 3: GSRP PRE-K ====================
    story.append(Paragraph("Section 3: GSRP Pre-K Family Style Workflow (Room 101)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "Great Start Readiness Program (GSRP) pre-kindergarten classrooms (led by Ms. Dana Owens in Beacon Room 101) operate under distinct state guidelines compared to K–5 classrooms:",
        body_style
    ))
    story.append(Paragraph("1. <b>Family-Style Dining:</b> Pre-K children eat family style together. There are no individual meal choices. Every child marked Present is fed. Therefore, both the <b>Meal</b> and <b>Snack</b> buttons default ON.", bullet_style))
    story.append(Paragraph("2. <b>Due by 9:00 AM:</b> The count is transmitted to the kitchen by 9:00 AM with teacher electronic signature.", bullet_style))
    story.append(Paragraph("3. <b>MDE 5-Day Weekly Sheet:</b> At the conclusion of each week, a comprehensive 5-day check-off sheet is generated, digitally signed, and transmitted to Food Service Director Brian Corbett for state CACFP reimbursement auditing.", bullet_style))

    story.append(Spacer(1, 15))

    # ==================== SECTION 4: GROUP B ====================
    story.append(Paragraph("Section 4: Group B — Parent Mobile Magic Link (Pages 6 to 9)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "Parents access MealTrack exclusively through secure SMS text links (e.g. <code>https://hws.mealtrackapp.com/f/{token}</code>) sent to mobile numbers on file in MiStar. No username or password creation is required.",
        body_style
    ))

    # Page 6
    story.append(Paragraph("Page 6: Parent Welcome & Enrolled Children", h2_style))
    story.append(Paragraph("Greets parent by name ('Welcome, Rachel Carter 👋'). Displays all enrolled district children in clean cards (Jordan Carter, Beacon Grade 2; Maya Carter, Beacon Grade 4). Prominent 48px CTA 'Start 2-Minute Benefit Form →' and secondary CTA 'View School Menus & Pre-Order Lunch'.", body_style))

    # Page 7
    story.append(Paragraph("Page 7: Educational Benefit Assistance Survey", h2_style))
    story.append(Paragraph("A streamlined 1-question survey: <i>'Does your household receive SNAP, FIP, or TANF assistance?'</i>", body_style))
    story.append(Paragraph("• <b>If Yes:</b> Clean numeric input for 9-digit State Case Number ('108492019-A').", bullet_style))
    story.append(Paragraph("• <b>If No:</b> Household size slider (1 to 8+) and monthly/annual income bracket buttons.", bullet_style))

    # Page 8
    story.append(Paragraph("Page 8: Parent Digital e-Signature & Confirmation", h2_style))
    story.append(Paragraph("Legal certification statement. Parent types full name ('Rachel M. Carter'). Upon clicking 'Certify & Submit Benefit Form ✓', screen transitions to animated green checkmark confirmation: <i>'Thank you, Rachel! Your household benefit form is approved for Jordan and Maya.'</i> Files a certified PDF in Azure Blob Storage.", body_style))

    # Page 9
    story.append(Paragraph("Page 9: Weekly Lunch Pre-Selection Calendar", h2_style))
    story.append(Paragraph("Top sibling switcher tab ('Jordan (Grade 2)' / 'Maya (Grade 4)'). Weekday tabs (Mon through Fri). Parents pre-select among 5 options: Hot Entrée A (Halal Strips), Cold Entrée B (Flatbread), Salad Bar, Bringing Lunch from Home, or Fasting/Skipping. Selections auto-save directly into Mrs. Ellis's classroom register.", body_style))

    story.append(PageBreak())

    # ==================== SECTION 5: GROUP C ====================
    story.append(Paragraph("Section 5: Group C — Master Super-Portal Administration (Pages 10 to 14)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "Ideal Technology Solutions operators (Michael Collins) manage client school districts through Group C.",
        body_style
    ))

    # Page 10
    story.append(Paragraph("Page 10: Master Client Districts Directory", h2_style))
    story.append(Paragraph("Top search bar filtering by district name or code. Metric cards: 14 Active Districts | 18,420 Enrolled Students | 2 Expiring Licenses. Grid of district cards showing crest, primary contact, license expiration pill ('Active · Expires Nov 20, 2027'), and 'Manage District & License →' link.", body_style))

    # Pages 11-13 Onboarding
    story.append(Paragraph("Pages 11–13: 3-Step Client District Onboarding Wizard", h2_style))
    story.append(Paragraph("• <b>Step 1 (Page 11 - Identity & Branding):</b> District legal name, subdomain prefix (previewing <code>dpsa.mealtrackapp.com</code>), drag-and-drop logo upload zone, and brand color hex picker with live preview.", bullet_style))
    story.append(Paragraph("• <b>Step 2 (Page 12 - License Term & Expiration):</b> Tier dropdown, contract start date, hard expiration date (11:59 PM EST), student seat cap, and Auto-Lockout enforcement policy (Hard Lockout on Date vs. 7-Day Grace Period).", bullet_style))
    story.append(Paragraph("• <b>Step 3 (Page 13 - Feature Modules Checklist):</b> Toggle switches licensing individual modules: K–5 Meal Register, GSRP Family Style, Latchkey Extended Day, Enrichment Programs, Educational Benefit Mobile Forms, and Real-Time Kitchen Push. Clicking 'Save District & Activate License 🚀' provisions the tenant.", bullet_style))

    # Page 14 Telemetry
    story.append(Paragraph("Page 14: Global System Telemetry & Background Job Health", h2_style))
    story.append(Paragraph("Live diagnostics for infrastructure components:", body_style))
    story.append(Paragraph("• <b>SignalR Real-Time Hub:</b> 'Connected · 42 Kitchens Active' with 14ms websocket latency.", bullet_style))
    story.append(Paragraph("• <b>Morning SMS Reminders Queue:</b> '38/38 Sent · 0 Failed' for the 7:00 AM delivery batch.", bullet_style))
    story.append(Paragraph("• <b>MDE Compliance Archive:</b> All signed attestations backed up in Azure SQL with SHA-256 immutable hashes.", bullet_style))

    story.append(Spacer(1, 15))

    # ==================== SECTION 6: GROUP D ====================
    story.append(Paragraph("Section 6: Group D — Client District Admin Console (Pages 15 to 17)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "Food Service Directors (Brian Corbett) oversee daily campus operations across Beacon and Tyrone Elementary.",
        body_style
    ))
    story.append(Paragraph("• <b>Page 15 (District Admin Home):</b> Prominent top banner with license transparency: <i>'✓ Licensed to Harper Woods Schools · Active through Nov 20, 2027 (361 days remaining)'</i>. Three large quick-access cards: Live Master Meal Report, Manage Teachers & Staff Accounts, and Educational Benefit Forms.", body_style))
    story.append(Paragraph("• <b>Page 16 (Staff Directory):</b> Roster table with columns for Staff Name, Role, School & Room, Email, Today's Count Status ('Submitted 8:48 AM' vs. '⚠️ Pending'), and Actions ('[ Remind ]' sends manual SMS nudge).", body_style))
    story.append(Paragraph("• <b>Page 17 (Invite Staff Form):</b> 1-column invite form capturing Full Name, District Email, Role dropdown, School dropdown, and Room Number, triggering Google Workspace SSO invitation.", body_style))

    story.append(PageBreak())

    # ==================== SECTION 7: GROUP E ====================
    story.append(Paragraph("Section 7: Group E — Food Service & Kitchen Line Operations (Pages 18 to 20)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "Cafeteria kitchen leads (Christine Goodwin at Beacon Central Kitchen) utilize Group E for meal production and regulatory compliance.",
        body_style
    ))

    # Page 18
    story.append(Paragraph("Page 18: Kitchen Live Preparation Board", h2_style))
    story.append(Paragraph("High-contrast display designed to be legible from 10 feet away across the cafeteria cooking line. Features massive numeric counters updated in real time via SignalR:", body_style))
    story.append(Paragraph("• <b>HOT ENTRÉE A:</b> 418 meals (Oven heat carts).", bullet_style))
    story.append(Paragraph("• <b>COLD ENTRÉE B:</b> 214 meals (Pre-pack coolers).", bullet_style))
    story.append(Paragraph("• <b>SALAD BAR:</b> 120 meals (Salad bowls & dinner rolls).", bullet_style))
    story.append(Paragraph("• <b>OWN LUNCH (NO PREP):</b> 46 (Milk cartons only).", bullet_style))
    story.append(Paragraph("• <b>DID NOT TAKE MEAL:</b> 18 (Dietary exempt/fasting).", bullet_style))
    story.append(Paragraph("• <b>TOTAL PRODUCTION PREP:</b> 752 cooked/assembled meals.", bullet_style))

    # Page 19
    story.append(Paragraph("Page 19: Live Change Alerts Stream", h2_style))
    story.append(Paragraph("Chronological stream of count adjustments received past 9:00 AM. Cards show originating room, reporting teacher, timestamp, and action buttons:", body_style))
    story.append(Paragraph("• Card 1: <i>'Beacon Room 205 (Mrs. Ellis): +1 Hot Entrée A (Caleb Williams · Arrived Late)'</i> → <b>[ Mark Added to Cart ]</b>.", bullet_style))
    story.append(Paragraph("• Card 2: <i>'Tyrone Room 210 (Mrs. Lane): Submitted late count (22 lunches)'</i> → <b>[ Acknowledged ]</b>.", bullet_style))

    # Page 20
    story.append(Paragraph("Page 20: In-App PDF Review & Benefit Form Approval Desk", h2_style))
    story.append(Paragraph("Split-screen desk for Food Service staff reviewing parent-submitted Title I forms:", body_style))
    story.append(Paragraph("• <b>Left Pane (65%):</b> Exact 8.5x11 PDF replica displaying district crest, student names (Jordan & Maya Carter), SNAP Case Number (108492019-A), household income bracket, and parent e-signature.", bullet_style))
    story.append(Paragraph("• <b>Right Pane (35%):</b> Audit verification checklist (SNAP Case Verified ✓, Household Matched in MiStar ✓). Classification selector (Approve as Free Meals, Approve as Reduced, Classify as Paid). Actions: <b>[ Approve & Sync to MiStar ]</b> and <b>[ Flag Duplicate ]</b>.", bullet_style))

    story.append(Spacer(1, 15))

    # ==================== SECTION 8: GROUP F ====================
    story.append(Paragraph("Section 8: Group F — Special States, Communication & Lockout (Pages 21 to 23)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    # Page 21
    story.append(Paragraph("Page 21: License Expired / Hard Lockout Screen", h2_style))
    story.append(Paragraph("Displayed automatically when a district's license passes its hard expiration date without contract renewal. Features centered 480px white card, soft red padlock icon, friendly explanation, role-specific instructions (Teachers contact administrators; Administrators contact Ideal Technology Solutions), and primary contact CTA.", body_style))

    # Page 22
    story.append(Paragraph("Page 22: 9:00 AM Daily Master Report Email Template", h2_style))
    story.append(Paragraph("600px responsive HTML email layout sent daily at 9:00 AM to Food Service Director Brian Corbett. Displays maroon header, headline <i>'752 Meals to Prepare Today across Beacon & Tyrone Elementary'</i>, detailed category breakdown table, campus splits, and certified PDF attachment pill.", body_style))

    # Page 23
    story.append(Paragraph("Page 23: Kitchen Live Change Alert Email & SMS Template", h2_style))
    story.append(Paragraph("High-urgency red-accented notification card sent to kitchen leads when warmer carts require immediate additions past 9:00 AM (e.g. <i>'🚨 MEAL COUNT CHANGE: Beacon Room 205 (+2 Lunches)'</i> with specific warmer cart instructions).", body_style))

    story.append(PageBreak())

    # ==================== SECTION 9 & 10 ====================
    story.append(Paragraph("Section 9: Legal Attestation & USDA/MDE CEP Compliance Framework", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "MealTrack guarantees full regulatory adherence under state and federal law:",
        body_style
    ))
    story.append(Paragraph("• <b>Federal ESIGN & Michigan UETA Compliance:</b> Every electronic signature includes intent to sign, explicit consent, cryptographic identity binding (Google SSO or SMS token verification), and immutable audit logs.", bullet_style))
    story.append(Paragraph("• <b>USDA CEP Requirements:</b> Under Community Eligibility Provision guidelines, schools do not collect individual meal payments. However, MealTrack maintains the exact count of meals served to present students to support MDE reimbursement claims.", bullet_style))
    story.append(Paragraph("• <b>Mandatory 3-Year Retention:</b> In accordance with USDA regulation 7 CFR 210.15, all daily certified counts, late updates, and parent benefit forms are retained for a minimum of 3 years following the end of the fiscal year.", bullet_style))

    story.append(Spacer(1, 15))
    story.append(Paragraph("Section 10: Technical Architecture, State Management & .NET Core Roadmap", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))

    story.append(Paragraph(
        "MealTrack Phase 1 is delivered as a modern, interactive single-page application built on React, Vite, and Tailwind CSS. All application state is structured to mirror upcoming <b>.NET Core Web API</b> Data Transfer Objects (DTOs):",
        body_style
    ))

    arch_data = [
        [Paragraph("<b>Layer</b>", table_header_style), Paragraph("<b>Phase 1 Implementation</b>", table_header_style), Paragraph("<b>Phase 2 .NET Core Target</b>", table_header_style)],
        [Paragraph("Client UI", table_cell_style), Paragraph("React 18 + Tailwind CSS + Lucide Icons", table_cell_style), Paragraph("Blazor / React SPA on Azure App Service", table_cell_style)],
        [Paragraph("State Cache", table_cell_style), Paragraph("Browser LocalStorage + JSON Mock Server", table_cell_style), Paragraph("Redis Distributed Cache + Entity Framework", table_cell_style)],
        [Paragraph("Live Push", table_cell_style), Paragraph("Simulated SignalR Event Bus (sub-second)", table_cell_style), Paragraph("Azure SignalR Service (WebSocket Hub)", table_cell_style)],
        [Paragraph("PDF Generation", table_cell_style), Paragraph("Interactive In-App PDF + ReportLab Engine", table_cell_style), Paragraph("QuestPDF Microservice on Azure Functions", table_cell_style)],
        [Paragraph("Database", table_cell_style), Paragraph("Structured JSON Store matching EF DTOs", table_cell_style), Paragraph("Azure SQL Database (PaaS) with TDE", table_cell_style)],
        [Paragraph("SIS Integration", table_cell_style), Paragraph("CSV Roster Import / Direct Cert Simulation", table_cell_style), Paragraph("Direct MiStar REST API Gateway", table_cell_style)],
    ]
    arch_table = Table(arch_data, colWidths=[90, 200, 214])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(arch_table)

    story.append(Spacer(1, 25))
    story.append(Paragraph("<b>APPROVAL & SIGN-OFF:</b> This technical user manual has been verified against the November 20 client conference and functional requirements specifications. Authorized for distribution to Harper Woods Schools food service personnel.", ParagraphStyle('Signoff', fontName='Helvetica-Oblique', fontSize=8.5, leading=12, textColor=colors.HexColor('#475569'))))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF manual at {filename}")

if __name__ == '__main__':
    out_dir = os.path.join(os.path.dirname(__file__), 'public')
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'MealTrack_SaaS_User_Manual.pdf')
    build_pdf(out_path)
