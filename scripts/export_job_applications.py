#!/usr/bin/env python3
"""
Export job applications from PostgreSQL database to Excel spreadsheet
"""

import pandas as pd
import psycopg2
import os
from datetime import datetime
import sys
from pathlib import Path

def denormalize_status(db_status):
    """Convert database enum value to user-friendly status"""
    status_mapping = {
        'APPLIED': 'Applied',
        'REJECTED': 'Rejected',
        'INTERVIEW_COMPLETED': 'Interview Completed',
        'RECRUITER_OUTREACH': 'Recruiter Outreach',
        'PHONE_INTERVIEW_COMPLETED': 'Phone Interview Completed',
        'PHONE_SCREEN_COMPLETED': 'Phone Screen Completed',
        'ROUND_2_COMPLETED': 'Round 2 Completed',
        'PHONE_SCREEN_PASSED': 'Phone Screen Passed',
        'RECRUITER_SUBMITTED': 'Recruiter Submitted',
        'PHONE_INTERVIEW_SCHEDULED': 'Phone Interview Scheduled',
        'INTERVIEW_SCHEDULED': 'Interview Scheduled',
        'PHONE_SCREEN_SCHEDULED': 'Phone Screen Scheduled',
        'ROUND_2_SCHEDULED': 'Round 2 Scheduled',
        'UNDER_REVIEW': 'Under Review',
        'OFFER_RECEIVED': 'Offer Received',
        'OFFER_ACCEPTED': 'Offer Accepted',
        'OFFER_DECLINED': 'Offer Declined',
        'WITHDRAWN': 'Withdrawn'
    }
    
    return status_mapping.get(db_status, db_status)

def export_job_applications(output_path=None):
    """Export job applications from PostgreSQL to Excel"""
    
    # Check for DATABASE_URL
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        print("   Add DATABASE_URL to your .env file or environment")
        return False
    
    # Connect to database
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        print("✅ Connected to PostgreSQL database")
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return False
    
    # Query all job applications
    try:
        cursor.execute("""
            SELECT 
                id,
                dateApplied,
                company,
                jobTitle,
                status,
                contactName,
                contactEmail,
                jobUrl,
                notes,
                jobDescription,
                createdAt,
                updatedAt
            FROM job_applications 
            ORDER BY dateApplied DESC, id DESC
        """)
        
        results = cursor.fetchall()
        print(f"📊 Retrieved {len(results)} job applications from database")
        
    except Exception as e:
        print(f"❌ Error querying database: {e}")
        return False
    finally:
        cursor.close()
        conn.close()
    
    if not results:
        print("⚠️ No job applications found in database")
        return False
    
    # Convert to DataFrame
    columns = [
        '#', 'Date Applied', 'Company', 'Job Title', 'Status', 
        'Contact Name', 'Contact Email', 'Job URL', 'Notes', 'Job Description'
    ]
    
    data = []
    for row in results:
        data.append([
            row[0],  # id as #
            row[1].strftime('%Y-%m-%d') if row[1] else '',  # dateApplied
            row[2] or '',  # company
            row[3] or '',  # jobTitle
            denormalize_status(row[4]) if row[4] else '',  # status
            row[5] or '',  # contactName
            row[6] or '',  # contactEmail
            row[7] or '',  # jobUrl
            row[8] or '',  # notes
            row[9] or '',  # jobDescription
        ])
    
    df = pd.DataFrame(data, columns=columns)
    
    # Determine output path
    if not output_path:
        workspace_path = Path(__file__).parent.parent.parent / 'workspace'
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_path = workspace_path / f'job_applications_from_db_{timestamp}.xlsx'
    else:
        output_path = Path(output_path)
    
    # Export to Excel
    try:
        df.to_excel(output_path, index=False, sheet_name='Job Applications')
        print(f"✅ Exported to: {output_path}")
        print(f"📁 File size: {output_path.stat().st_size:,} bytes")
        
        # Show summary
        status_counts = df['Status'].value_counts()
        print(f"\n📈 Summary:")
        print(f"   Total applications: {len(df)}")
        print(f"   Date range: {df['Date Applied'].min()} to {df['Date Applied'].max()}")
        print(f"   Companies: {df['Company'].nunique()} unique")
        print(f"\n📊 Status breakdown:")
        for status, count in status_counts.head(8).items():
            print(f"   {status}: {count}")
        
        return output_path
        
    except Exception as e:
        print(f"❌ Error exporting to Excel: {e}")
        return False

def create_summary_report():
    """Create a summary report of job applications"""
    
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        return False
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        # Get summary statistics
        cursor.execute("""
            SELECT 
                COUNT(*) as total_applications,
                COUNT(DISTINCT company) as unique_companies,
                MIN(dateApplied) as earliest_application,
                MAX(dateApplied) as latest_application,
                status,
                COUNT(*) as status_count
            FROM job_applications 
            GROUP BY status
            ORDER BY status_count DESC
        """)
        
        summary_data = cursor.fetchall()
        
        print("\n📊 Job Applications Summary Report")
        print("=" * 50)
        
        if summary_data:
            total_apps = summary_data[0][0]
            unique_companies = summary_data[0][1] 
            earliest = summary_data[0][2]
            latest = summary_data[0][3]
            
            print(f"Total Applications: {total_apps}")
            print(f"Unique Companies: {unique_companies}")
            print(f"Date Range: {earliest} to {latest}")
            print("\nStatus Breakdown:")
            
            for row in summary_data:
                status = denormalize_status(row[4])
                count = row[5]
                percentage = (count / total_apps) * 100
                print(f"  {status}: {count} ({percentage:.1f}%)")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error generating summary: {e}")
        return False
    
    return True

def main():
    print("📤 Job Applications Export Tool")
    print("=" * 40)
    
    if len(sys.argv) > 1:
        output_path = sys.argv[1]
    else:
        output_path = None
    
    # Export to Excel
    result = export_job_applications(output_path)
    
    if result:
        print(f"\n🎉 Export completed successfully!")
        print(f"📄 File: {result}")
        
        # Generate summary report
        create_summary_report()
        
        print("\nNext steps:")
        print("1. Review exported spreadsheet")
        print("2. Compare with original to verify data integrity") 
        print("3. Update any new applications in database")
    else:
        print("\n❌ Export failed")
        sys.exit(1)

if __name__ == "__main__":
    main()