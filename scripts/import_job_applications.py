#!/usr/bin/env python3
"""
Import job applications from Excel spreadsheet to PostgreSQL database
"""

import pandas as pd
import psycopg2
import os
from datetime import datetime
import sys
from pathlib import Path

def normalize_status(status_str):
    """Convert spreadsheet status to database enum value"""
    if pd.isna(status_str):
        return 'APPLIED'
    
    status_mapping = {
        'Applied': 'APPLIED',
        'Rejected': 'REJECTED', 
        'Interview Completed': 'INTERVIEW_COMPLETED',
        'Recruiter Outreach': 'RECRUITER_OUTREACH',
        'Phone Interview Completed': 'PHONE_INTERVIEW_COMPLETED',
        'Phone Screen Completed': 'PHONE_SCREEN_COMPLETED',
        'Round 2 Completed': 'ROUND_2_COMPLETED',
        'Phone Screen Passed': 'PHONE_SCREEN_PASSED',
        'Recruiter Submitted': 'RECRUITER_SUBMITTED',
        'Phone Interview Scheduled': 'PHONE_INTERVIEW_SCHEDULED',
        'Interview Scheduled': 'INTERVIEW_SCHEDULED',
        'Phone Screen Scheduled': 'PHONE_SCREEN_SCHEDULED',
        'Round 2 Scheduled': 'ROUND_2_SCHEDULED',
        'Under Review': 'UNDER_REVIEW'
    }
    
    return status_mapping.get(status_str.strip(), 'APPLIED')

def import_job_applications():
    """Import job applications from Excel to PostgreSQL"""
    
    # Check for DATABASE_URL
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        print("   Add DATABASE_URL to your .env file or environment")
        return False
    
    # Read Excel file
    excel_path = Path(__file__).parent.parent.parent / 'workspace' / 'job_applications.xlsx'
    
    try:
        df = pd.read_excel(excel_path)
        print(f"📊 Read {len(df)} job applications from spreadsheet")
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return False
    
    # Connect to database
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        print("✅ Connected to PostgreSQL database")
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return False
    
    # Clear existing data (optional - be careful!)
    try:
        cursor.execute("DELETE FROM job_applications")
        print("🗑️ Cleared existing job applications data")
    except Exception as e:
        print(f"⚠️ Could not clear existing data: {e}")
        # Continue anyway - might be first import
    
    # Import data
    imported_count = 0
    errors = []
    
    for index, row in df.iterrows():
        try:
            # Skip rows with no company (likely header or empty rows)
            if pd.isna(row['Company']) or row['Company'] == 'Company':
                continue
            
            # Parse date
            date_applied = pd.to_datetime(row['Date Applied']).date()
            
            # Normalize status
            status = normalize_status(row['Status'])
            
            # Insert into database
            cursor.execute("""
                INSERT INTO job_applications 
                (dateApplied, company, jobTitle, status, contactName, contactEmail, jobUrl, notes, jobDescription)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                date_applied,
                str(row['Company']).strip(),
                str(row['Job Title']).strip() if pd.notna(row['Job Title']) else 'Unknown Position',
                status,
                str(row['Contact Name']).strip() if pd.notna(row['Contact Name']) else None,
                str(row['Contact Email']).strip() if pd.notna(row['Contact Email']) else None,
                str(row['Job URL']).strip() if pd.notna(row['Job URL']) else None,
                str(row['Notes']).strip() if pd.notna(row['Notes']) else None,
                str(row['Job Description']).strip() if pd.notna(row['Job Description']) else None
            ))
            
            imported_count += 1
            
        except Exception as e:
            errors.append(f"Row {index + 1}: {e}")
            continue
    
    # Commit changes
    try:
        conn.commit()
        print(f"✅ Successfully imported {imported_count} job applications")
        
        if errors:
            print(f"⚠️ {len(errors)} errors occurred:")
            for error in errors[:5]:  # Show first 5 errors
                print(f"   {error}")
        
        # Show final count
        cursor.execute("SELECT COUNT(*) FROM job_applications")
        total_count = cursor.fetchone()[0]
        print(f"📊 Total job applications in database: {total_count}")
        
    except Exception as e:
        print(f"❌ Error committing data: {e}")
        conn.rollback()
        return False
        
    finally:
        cursor.close()
        conn.close()
    
    return True

def main():
    print("📥 Job Applications Import Tool")
    print("=" * 40)
    
    success = import_job_applications()
    
    if success:
        print("\n🎉 Import completed successfully!")
        print("\nNext steps:")
        print("1. Verify data with: SELECT * FROM job_applications LIMIT 5;")
        print("2. Test export functionality")
    else:
        print("\n❌ Import failed")
        sys.exit(1)

if __name__ == "__main__":
    main()