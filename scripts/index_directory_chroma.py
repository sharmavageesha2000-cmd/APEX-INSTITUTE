import os
import re
import json
import chromadb

def build_documents():
    docs = []
    
    # 1. Company Profile
    docs.append({
        "id": "profile_hq_institute",
        "category": "profile",
        "title": "Apex Training Institute Profile & Headquarters Information",
        "text": """Company Name: Apex Training Institute Private Limited
Headquarters & Tech Campus: Apex Tower, Outer Ring Road, HSR Layout, Sector 1, Bangalore, Karnataka – 560102
Official Central Helpline: +91 80 4120 7800 / +91 98450 12890
Official Email: contact@apexbangalore.in
Operating Hours: Monday to Saturday: 8:00 AM – 8:30 PM | Sunday: 9:00 AM – 6:00 PM (Labs Open for practice)
Location: HSR Layout, Sector 1, Bangalore, Karnataka.""",
        "metadata": {
            "category": "profile",
            "entity": "Apex Training Institute Private Limited",
            "location": "HSR Layout, Bangalore"
        }
    })

    # 2. Master Personnel Register
    personnel = [
        {
            "id": "person_arvind_singhania",
            "name": "Dr. Arvind R. Singhania",
            "title": "Managing Director (MD) & Co-Founder",
            "dept": "Executive Board (HSR HQ)",
            "email": "arvind.singhania@apexbangalore.in",
            "ext": "Ext. 101",
            "responsibilities": "Formulates 10-year institutional strategy, capital investments, corporate legal compliance, university partnerships, and chairs quarterly Executive Board reviews.",
            "text": "Dr. Arvind R. Singhania is the Founder and Managing Director (MD) & Co-Founder of Apex Training Institute. Department: Executive Board (HSR Layout Headquarters). Email: arvind.singhania@apexbangalore.in, Desk Ext: 101. Core Responsibilities: Formulates 10-year institutional strategy, capital investments, corporate legal compliance, university partnerships, and chairs quarterly Executive Board reviews."
        },
        {
            "id": "person_rajeshwari_nair",
            "name": "Rajeshwari K. Nair",
            "title": "Chief Executive Officer (CEO)",
            "dept": "Executive Office (HSR HQ)",
            "email": "rajeshwari.nair@apexbangalore.in",
            "ext": "Ext. 102",
            "responsibilities": "Oversees pan-India operations, company P&L, student enrollment goals, enterprise training contracts with Bangalore IT corridors, and superintends all functional department heads.",
            "text": "Rajeshwari K. Nair is the Chief Executive Officer (CEO) of Apex Training Institute. Department: Executive Office (HSR Layout Headquarters). Email: rajeshwari.nair@apexbangalore.in, Desk Ext: 102. Core Responsibilities: Oversees pan-India operations, company P&L, student enrollment goals, enterprise training contracts with Bangalore IT corridors, and superintends all functional department heads."
        },
        {
            "id": "person_vikramaditya_sen",
            "name": "Vikramaditya Sen",
            "title": "Chief Operating Officer (COO)",
            "dept": "Operations Directorate (HSR HQ)",
            "email": "vikram.sen@apexbangalore.in",
            "ext": "Ext. 103",
            "responsibilities": "Manages daily facility operations across all Bangalore branches, lease renewals, lab workstation maintenance, classroom batch schedules, and vendor service contracts.",
            "text": "Vikramaditya Sen is the Chief Operating Officer (COO) of Apex Training Institute. Department: Operations Directorate (HSR Layout Headquarters). Email: vikram.sen@apexbangalore.in, Desk Ext: 103. Core Responsibilities: Manages daily facility operations across all Bangalore branches, lease renewals, lab workstation maintenance, classroom batch schedules, and vendor service contracts."
        },
        {
            "id": "person_sunita_deshmukh",
            "name": "Sunita Deshmukh",
            "title": "Head of Human Resources (HR Head)",
            "dept": "Human Capital Dept (HSR HQ)",
            "email": "sunita.d@apexbangalore.in",
            "ext": "Ext. 301",
            "responsibilities": "Designs institute-wide recruitment policies, compensation scales, labor law compliance, bi-annual appraisal reviews, and chairs the POSH / Internal Grievance committee.",
            "text": "Sunita Deshmukh is the Head of Human Resources (HR Head) of Apex Training Institute. Department: Human Capital Dept (HSR Layout Headquarters). Email: sunita.d@apexbangalore.in, Desk Ext: 301. Core Responsibilities: Designs institute-wide recruitment policies, compensation scales, labor law compliance, bi-annual appraisal reviews, and chairs the POSH / Internal Grievance committee."
        },
        {
            "id": "person_divya_swaminathan",
            "name": "Divya Swaminathan",
            "title": "HR Manager – Talent Acquisition",
            "dept": "HR Operations (HSR HQ)",
            "email": "divya.s@apexbangalore.in",
            "ext": "Ext. 302",
            "responsibilities": "Leads end-to-end recruitment for technical trainers, lab instructors, and branch counselors; conducts multi-round technical interviews and background checks (BGV).",
            "text": "Divya Swaminathan is the HR Manager – Talent Acquisition of Apex Training Institute. Department: HR Operations (HSR Layout Headquarters). Email: divya.s@apexbangalore.in, Desk Ext: 302. Core Responsibilities: Leads end-to-end recruitment for technical trainers, lab instructors, and branch counselors; conducts multi-round technical interviews and background checks (BGV)."
        },
        {
            "id": "person_tanya_kapoor",
            "name": "Tanya Kapoor",
            "title": "Assistant HR Manager – Payroll & Welfare",
            "dept": "HR Operations (HSR HQ)",
            "email": "tanya.k@apexbangalore.in",
            "ext": "Ext. 303",
            "responsibilities": "Executes monthly payroll, PF/ESI/tax deductions, attendance regularization, staff health insurance claims, and off-boarding documentation.",
            "text": "Tanya Kapoor is the Assistant HR Manager – Payroll & Welfare of Apex Training Institute. Department: HR Operations (HSR Layout Headquarters). Email: tanya.k@apexbangalore.in, Desk Ext: 303. Core Responsibilities: Executes monthly payroll, PF/ESI/tax deductions, attendance regularization, staff health insurance claims, and off-boarding documentation."
        },
        {
            "id": "person_harishankar_murthy",
            "name": "Prof. Harishankar Murthy",
            "title": "Head of Academics & Delivery",
            "dept": "Academic Directorate (HSR HQ)",
            "email": "h.murthy@apexbangalore.in",
            "ext": "Ext. 201",
            "responsibilities": "Supervises the master technical trainer panel, conducts blind classroom audits, reviews student teaching scores, and resolves student academic escalations.",
            "text": "Prof. Harishankar Murthy is the Head of Academics & Delivery (Head of Academics & Training Delivery) at Apex Training Institute. Department: Academic Directorate (HSR Layout Headquarters). Email: h.murthy@apexbangalore.in, Desk Ext: 201. Core Responsibilities: Supervises the master technical trainer panel, conducts blind classroom audits, reviews student teaching scores, and resolves student academic escalations."
        },
        {
            "id": "person_ananya_roy",
            "name": "Ananya Roy",
            "title": "Head of Corporate Relations & Placements",
            "dept": "Placements Directorate (HSR HQ)",
            "email": "ananya.roy@apexbangalore.in",
            "ext": "Ext. 202",
            "responsibilities": "Directs corporate hiring tie-ups with IT MNCs in Electronic City, Whitefield, and ORR; organizes on-campus recruitment drives and resume verification.",
            "text": "Ananya Roy is the Head of Corporate Relations & Placements at Apex Training Institute. Department: Placements Directorate (HSR Layout Headquarters). Email: ananya.roy@apexbangalore.in, Desk Ext: 202. Core Responsibilities: Directs corporate hiring tie-ups with IT MNCs in Electronic City, Whitefield, and ORR; organizes on-campus recruitment drives and resume verification."
        },
        {
            "id": "person_farhan_qureshi",
            "name": "Dr. Farhan Akhtar Qureshi",
            "title": "Head of IT & Infrastructure",
            "dept": "Information Technology (HSR HQ)",
            "email": "farhan.qureshi@apexbangalore.in",
            "ext": "Ext. 203",
            "responsibilities": "Oversees multi-gigabit leased lines, private cloud lab environments, campus server clusters, workstation maintenance, and DPDP Act/ISO 27001 data security.",
            "text": "Dr. Farhan Akhtar Qureshi is the Head of IT & Infrastructure at Apex Training Institute. Department: Information Technology (HSR Layout Headquarters). Email: farhan.qureshi@apexbangalore.in, Desk Ext: 203. Core Responsibilities: Oversees multi-gigabit leased lines, private cloud lab environments, campus server clusters, workstation maintenance, and DPDP Act/ISO 27001 data security."
        },
        {
            "id": "person_karthik_subramanian",
            "name": "Karthik Subramanian",
            "title": "Head of Marketing & Student Counseling",
            "dept": "Student Admissions (HSR HQ)",
            "email": "karthik.s@apexbangalore.in",
            "ext": "Ext. 204",
            "responsibilities": "Supervises academic counseling desks across branches, walk-in student career guidance, orientation webinars, and admissions workflow integrity.",
            "text": "Karthik Subramanian is the Head of Marketing & Student Counseling at Apex Training Institute. Department: Student Admissions (HSR Layout Headquarters). Email: karthik.s@apexbangalore.in, Desk Ext: 204. Core Responsibilities: Supervises academic counseling desks across branches, walk-in student career guidance, orientation webinars, and admissions workflow integrity."
        },
        {
            "id": "person_pradeep_kulkarni",
            "name": "Pradeep V. Kulkarni",
            "title": "Central Operations Manager",
            "dept": "Campus Operations (HSR HQ)",
            "email": "pradeep.k@apexbangalore.in",
            "ext": "Ext. 115",
            "responsibilities": "Coordinates batch timings, lab allocations, classroom readiness, and inter-branch logistical synchronization across all Bangalore locations.",
            "text": "Pradeep V. Kulkarni is the Central Operations Manager at Apex Training Institute. Department: Campus Operations (HSR Layout Headquarters). Email: pradeep.k@apexbangalore.in, Desk Ext: 115. Core Responsibilities: Coordinates batch timings, lab allocations, classroom readiness, and inter-branch logistical synchronization across all Bangalore locations."
        },
        {
            "id": "person_amitav_choudhury",
            "name": "Amitav Roy Choudhury",
            "title": "Procurement & Facility Manager",
            "dept": "Facilities & Procurement",
            "email": "amitav.roy@apexbangalore.in",
            "ext": "Ext. 118",
            "responsibilities": "Manages bulk purchases of computing hardware, lab furniture, online UPS systems, electrical generator AMCs, and campus physical security staff.",
            "text": "Amitav Roy Choudhury is the Procurement & Facility Manager at Apex Training Institute. Department: Facilities & Procurement. Email: amitav.roy@apexbangalore.in, Desk Ext: 118. Core Responsibilities: Manages bulk purchases of computing hardware, lab furniture, online UPS systems, electrical generator AMCs, and campus physical security staff."
        }
    ]

    for p in personnel:
        docs.append({
            "id": p["id"],
            "category": "personnel",
            "title": f"{p['name']} - {p['title']}",
            "text": p["text"],
            "metadata": {
                "category": "personnel",
                "name": p["name"],
                "title": p["title"],
                "dept": p["dept"],
                "email": p["email"],
                "ext": p["ext"]
            }
        })

    # 3. Regional Branch Network & Campus Specifications
    branches = [
        {
            "id": "branch_hsr_hq",
            "name": "Headquarters & Tech Campus (HSR Layout)",
            "address": "Apex Tower, Outer Ring Road, HSR Layout, Sector 1, Bangalore – 560102",
            "head": "Vidyadhar Hegde (Center Manager)",
            "contact": "Ph: +91 80 4120 7810 | Ext: 110",
            "specs": "22,500 sq. ft. | 6 Hi-Tech Labs (220 High-End Workstations), 150-seat Tech Auditorium, 1 Gbps Airtel Leased Line, 160 kVA Generator. Houses central MD, CEO & HR executive offices.",
            "text": "Headquarters & Tech Campus (HSR Layout): Apex Tower, Outer Ring Road, HSR Layout, Sector 1, Bangalore – 560102. Branch Head: Vidyadhar Hegde (Center Manager), Phone: +91 80 4120 7810, Ext: 110. Facilities & Role: 22,500 sq. ft., 6 Hi-Tech Labs (220 High-End Workstations), 150-seat Tech Auditorium, 1 Gbps Airtel Leased Line, 160 kVA Generator. Houses central MD, CEO & HR executive offices."
        },
        {
            "id": "branch_marathahalli",
            "name": "Marathahalli / ORR Branch",
            "address": "Silver Square Building, 2nd & 3rd Flr, Outer Ring Rd, Marathahalli, Bengaluru – 560037",
            "head": "Suresh Babu M. (Branch Operations Head)",
            "contact": "Ph: +91 80 4155 9200 | Ext: 210",
            "specs": "14,000 sq. ft. | 4 Labs (140 Workstations), 2 Career Counseling Rooms, 500 Mbps Tata Leased Line, 100 kVA Generator. Weekend batches for IT employees.",
            "text": "Marathahalli / ORR Branch: Silver Square Building, 2nd & 3rd Flr, Outer Ring Rd, Marathahalli, Bengaluru – 560037. Branch Head: Suresh Babu M. (Branch Operations Head), Phone: +91 80 4155 9200, Ext: 210. Facilities & Role: 14,000 sq. ft., 4 Labs (140 Workstations), 2 Career Counseling Rooms, 500 Mbps Tata Leased Line, 100 kVA Generator. Caters to IT employees and professionals on Outer Ring Road."
        },
        {
            "id": "branch_rajajinagar",
            "name": "Rajajinagar West Branch",
            "address": "West City Arcade, 1st & 2nd Flr, Dr. Rajkumar Rd, Rajajinagar, Bengaluru – 560010",
            "head": "Manjunath Swamy (Branch Manager)",
            "contact": "Ph: +91 80 4233 4100 | Ext: 310",
            "specs": "11,200 sq. ft. | 3 Labs (100 Workstations), Mock-Interview Studio, 300 Mbps Fiber, 60 kVA Online UPS. Caters to North & West Bangalore graduates.",
            "text": "Rajajinagar West Branch: West City Arcade, 1st & 2nd Flr, Dr. Rajkumar Rd, Rajajinagar, Bengaluru – 560010. Branch Head: Manjunath Swamy (Branch Manager), Phone: +91 80 4233 4100, Ext: 310. Facilities & Role: 11,200 sq. ft., 3 Labs (100 Workstations), Mock-Interview Studio, 300 Mbps Fiber, 60 kVA Online UPS. Caters to North & West Bangalore students and graduates."
        },
        {
            "id": "branch_electronic_city",
            "name": "Electronic City Phase 1 Branch",
            "address": "Silicon Landmark, 3rd Flr, Neeladri Rd, Electronic City Phase 1, Bengaluru – 560100",
            "head": "Deepak Chawla (Branch Operations Lead)",
            "contact": "Ph: +91 80 4390 6500 | Ext: 410",
            "specs": "13,500 sq. ft. | 4 Labs (130 High-Density Workstations), Proctored Assessment Room, 500 Mbps Line, 80 kVA Generator. Corporate & enterprise batches.",
            "text": "Electronic City Phase 1 Branch: Silicon Landmark, 3rd Flr, Neeladri Rd, Electronic City Phase 1, Bengaluru – 560100. Branch Head: Deepak Chawla (Branch Operations Lead), Phone: +91 80 4390 6500, Ext: 410. Facilities & Role: 13,500 sq. ft., 4 Labs (130 High-Density Workstations), Proctored Assessment Room, 500 Mbps Line, 80 kVA Generator. Corporate & enterprise batches."
        },
        {
            "id": "branch_jabalpur",
            "name": "Jabalpur Regional Center",
            "address": "Apex Knowledge Complex, 2nd & 3rd Flr, Civil Lines Tech Enclave, Jabalpur, MP – 482001",
            "head": "Sanjay Rathore (Regional Center Head)",
            "contact": "Ph: +91 761 490 4000 | Ext: 510",
            "specs": "16,500 sq. ft. | 4 Labs (160 Workstations), 90-terminal Proctored Exam Center, Dual 300 Mbps Line, 125 kVA DG Backup. Central India outreach hub.",
            "text": "Jabalpur Regional Center: Apex Knowledge Complex, 2nd & 3rd Flr, Civil Lines Tech Enclave, Jabalpur, MP – 482001. Branch Head: Sanjay Rathore (Regional Center Head), Phone: +91 761 490 4000, Ext: 510. Facilities & Role: 16,500 sq. ft., 4 Labs (160 Workstations), 90-terminal Proctored Exam Center, Dual 300 Mbps Line, 125 kVA DG Backup. Central India outreach hub."
        }
    ]

    for b in branches:
        docs.append({
            "id": b["id"],
            "category": "branch",
            "title": f"Apex Branch: {b['name']}",
            "text": b["text"],
            "metadata": {
                "category": "branch",
                "name": b["name"],
                "address": b["address"],
                "head": b["head"],
                "contact": b["contact"]
            }
        })

    # 4. Canonical QA Pairs from Section 7 of Document
    qa_pairs = [
        {
            "q": "Where is the Headquarters of Apex Training Institute located?",
            "a": "The Headquarters & Tech Campus of Apex Training Institute is located at: Apex Tower, Outer Ring Road, HSR Layout, Sector 1, Bangalore, Karnataka – 560102 (Phone: +91 80 4120 7800 / +91 98450 12890, Email: contact@apexbangalore.in)."
        },
        {
            "q": "What is the address of Apex Training Institute Head Office?",
            "a": "The official head office address is Apex Tower, Outer Ring Road, HSR Layout, Sector 1, Bangalore 560102."
        },
        {
            "q": "Who is the Founder or Managing Director of Apex Training Institute?",
            "a": "Dr. Arvind R. Singhania is the Founder and Managing Director (MD) of Apex Training Institute. He is based at the Bangalore HSR Layout Headquarters (Email: arvind.singhania@apexbangalore.in, Desk Ext: 101). He is responsible for organizational strategy, capital allocation, university partnerships, and executive governance."
        },
        {
            "q": "Who is the CEO of Apex Training Institute?",
            "a": "Rajeshwari K. Nair is the Chief Executive Officer (CEO) of Apex Training Institute. She is based at the HSR Layout Headquarters and oversees all operations, P&L, corporate partnerships across Bangalore tech corridors, and superintends all department heads (Email: rajeshwari.nair@apexbangalore.in, Desk Ext: 102)."
        },
        {
            "q": "Who is the COO of Apex Training Institute?",
            "a": "Vikramaditya Sen is the Chief Operating Officer (COO). He manages day-to-day operations across all Bangalore branches, facility leases, computer workstation maintenance, and center safety protocols (Email: vikram.sen@apexbangalore.in, Desk Ext: 103)."
        },
        {
            "q": "Who heads the Human Resources (HR) Department at Apex Training Institute?",
            "a": "Sunita Deshmukh is the Head of Human Resources (HR Head). She is based at the HSR Layout Headquarters and oversees HR policy, labor law compliances, staff compensation, and chairs the POSH and grievance committee (Email: sunita.d@apexbangalore.in, Desk Ext: 301)."
        },
        {
            "q": "Who manages recruitment and talent acquisition in HR?",
            "a": "Divya Swaminathan is the HR Manager for Operations & Talent Acquisition (Email: divya.s@apexbangalore.in, Desk Ext: 302). She coordinates applicant screening, interviews, and trainer onboarding."
        },
        {
            "q": "Who is in charge of employee payroll and welfare?",
            "a": "Tanya Kapoor is the Assistant HR Manager for Payroll, Attendance & Employee Welfare (Email: tanya.k@apexbangalore.in, Desk Ext: 303)."
        },
        {
            "q": "Who is the Head of Placements and Corporate Relations?",
            "a": "Ananya Roy is the Head of Corporate Relations & Placements (Email: ananya.roy@apexbangalore.in, Ext: 202). She builds hiring tie-ups with IT MNCs and startups across Outer Ring Road, HSR Layout, Electronic City, and Whitefield."
        },
        {
            "q": "Who heads Academic Delivery and Trainer Quality?",
            "a": "Prof. Harishankar Murthy is the Head of Academics & Training Delivery (Email: h.murthy@apexbangalore.in, Ext: 201). He audits trainer quality, manages faculty reviews, and resolves academic disputes."
        },
        {
            "q": "Who is the Head of IT and Lab Infrastructure?",
            "a": "Dr. Farhan Akhtar Qureshi is the Head of IT & Lab Infrastructure (Email: farhan.qureshi@apexbangalore.in, Ext: 203). He manages internet leased lines, server security, and computer lab setups."
        },
        {
            "q": "What branches does Apex Training Institute have in Bangalore?",
            "a": "Apex Training Institute operates multiple campuses in Bangalore: (1) Headquarters & Tech Campus at Outer Ring Road, HSR Layout Sector 1, (2) Marathahalli / Outer Ring Road Branch, (3) Rajajinagar West Branch, and (4) Electronic City Phase 1 Branch. It also maintains a regional branch in Jabalpur (Civil Lines Tech Enclave)."
        },
        {
            "q": "Who is the Center Manager for the HSR Layout Headquarters campus?",
            "a": "Vidyadhar Hegde is the Center Manager for the Headquarters & Tech Campus at HSR Layout (Phone: +91 80 4120 7810, Ext: 110)."
        },
        {
            "q": "Who manages the Marathahalli branch?",
            "a": "Suresh Babu M. is the Branch Operations Head for the Marathahalli / Outer Ring Road branch (Phone: +91 80 4155 9200, Ext: 210)."
        },
        {
            "q": "Who manages the Rajajinagar branch?",
            "a": "Manjunath Swamy is the Branch Manager for the Rajajinagar branch (Phone: +91 80 4233 4100, Ext: 310)."
        },
        {
            "q": "Who manages the Electronic City branch?",
            "a": "Deepak Chawla is the Branch Operations Lead for the Electronic City Phase 1 campus (Phone: +91 80 4390 6500, Ext: 410)."
        },
        {
            "q": "What are the official working hours of Apex Training Institute?",
            "a": "The institute operates Monday to Saturday from 8:00 AM to 8:30 PM, and on Sundays from 9:00 AM to 6:00 PM for scheduled batches and lab practice."
        },
        {
            "q": "Who is the Central Operations Manager at Apex Training Institute?",
            "a": "Pradeep V. Kulkarni is the Central Operations Manager (Email: pradeep.k@apexbangalore.in, Desk Ext: 115). He coordinates batch timings, lab allocations, and inter-branch logistical synchronization."
        },
        {
            "q": "Who is the Procurement & Facility Manager at Apex Training Institute?",
            "a": "Amitav Roy Choudhury is the Procurement & Facility Manager (Email: amitav.roy@apexbangalore.in, Desk Ext: 118). He manages hardware purchases, UPS systems, generator AMCs, and campus security."
        },
        {
            "q": "Who manages the Jabalpur Regional Center?",
            "a": "Sanjay Rathore is the Regional Center Head for Jabalpur Regional Center (Phone: +91 761 490 4000, Ext: 510, Address: Apex Knowledge Complex, Civil Lines Tech Enclave, Jabalpur)."
        },
        {
            "q": "What is the official helpline phone number and email of Apex Training Institute?",
            "a": "The central helpline numbers are +91 80 4120 7800 and +91 98450 12890. The official email is contact@apexbangalore.in."
        },
        {
            "q": "What are the lab and campus facilities at HSR Layout Headquarters?",
            "a": "The HSR Layout Headquarters features 22,500 sq. ft., 6 Hi-Tech Labs with 220 high-end workstations, a 150-seat Tech Auditorium, 1 Gbps Airtel Leased Line, and 160 kVA Generator power backup."
        }
    ]

    for idx, qa in enumerate(qa_pairs):
        docs.append({
            "id": f"qa_{idx+1}",
            "category": "qa_pair",
            "title": qa["q"],
            "text": f"Question: {qa['q']}\nAnswer: {qa['a']}",
            "metadata": {
                "category": "qa_pair",
                "question": qa["q"],
                "answer": qa["a"]
            }
        })

    return docs

def main():
    print("Starting ChromaDB Indexing for Apex Company Directory...")
    chroma_path = os.path.abspath("./chroma_data")
    os.makedirs(chroma_path, exist_ok=True)
    
    client = chromadb.PersistentClient(path=chroma_path)
    
    collection_name = "apex_company_directory"
    try:
        client.delete_collection(collection_name)
        print(f"Cleared existing collection: {collection_name}")
    except Exception:
        pass
        
    collection = client.create_collection(
        name=collection_name,
        metadata={"description": "Apex Training Institute HSR Headquarters & Personnel Register"}
    )
    
    docs = build_documents()
    
    ids = [d["id"] for d in docs]
    documents = [d["text"] for d in docs]
    metadatas = [d["metadata"] for d in docs]
    
    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )
    
    print(f"Successfully indexed {len(docs)} documents into ChromaDB collection '{collection_name}' at {chroma_path}")
    
    # Save a JSON export in src/lib for zero-failure fallback
    export_path = os.path.abspath("./src/lib/company_directory_rag.json")
    os.makedirs(os.path.dirname(export_path), exist_ok=True)
    with open(export_path, "w", encoding="utf-8") as f:
        json.dump(docs, f, indent=2, ensure_ascii=False)
    print(f"Exported fallback knowledge to {export_path}")
    
    # Quick self-test query
    test_query = "Who is the CEO of Apex?"
    res = collection.query(query_texts=[test_query], n_results=2)
    print("\n--- TEST QUERY ---")
    print(f"Query: '{test_query}'")
    print(f"Top result ID: {res['ids'][0][0]}")
    print(f"Distance: {res['distances'][0][0]}")
    print(f"Document snippet:\n{res['documents'][0][0][:200]}...")

if __name__ == "__main__":
    main()
