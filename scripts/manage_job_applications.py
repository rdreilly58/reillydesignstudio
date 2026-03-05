#!/usr/bin/env python3
"""
Job Applications Database Management Tool
Provides CRUD operations for job applications
"""

import psycopg2
import os
from datetime import datetime, date
import sys
import argparse

def get_db_connection():
    """Get database connection"""
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        return None
    
    try:
        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return None

def list_applications(status_filter=None, company_filter=None, limit=10):
    """List job applications with optional filtering"""
    
    conn = get_db_connection()
    if not conn:
        return
    
    cursor = conn.cursor()
    
    # Build query with filters
    where_clauses = []
    params = []
    
    if status_filter:
        where_clauses.append("status = %s")
        params.append(status_filter.upper())
    
    if company_filter:
        where_clauses.append("company ILIKE %s")
        params.append(f"%{company_filter}%")
    
    where_clause = " WHERE " + " AND ".join(where_clauses) if where_clauses else ""
    
    query = f"""
        SELECT id, dateApplied, company, jobTitle, status, contactName
        FROM job_applications
        {where_clause}
        ORDER BY dateApplied DESC, id DESC
        LIMIT %s
    """
    
    params.append(limit)
    
    try:
        cursor.execute(query, params)
        results = cursor.fetchall()
        
        print(f"\n📋 Job Applications ({len(results)} shown)")
        print("=" * 80)
        print(f"{'ID':<4} {'Date':<12} {'Company':<25} {'Title':<30} {'Status':<20}")
        print("-" * 80)
        
        for row in results:
            job_id, date_applied, company, title, status, contact = row
            print(f"{job_id:<4} {date_applied.strftime('%Y-%m-%d'):<12} {company[:24]:<25} {title[:29]:<30} {status:<20}")
        
        if not results:
            print("No applications found matching criteria")
            
    except Exception as e:
        print(f"❌ Error listing applications: {e}")
    finally:
        cursor.close()
        conn.close()

def add_application(company, job_title, date_applied=None, status='APPLIED', **kwargs):
    """Add a new job application"""
    
    conn = get_db_connection()
    if not conn:
        return
    
    cursor = conn.cursor()
    
    # Use today if no date provided
    if not date_applied:
        date_applied = date.today()
    elif isinstance(date_applied, str):
        date_applied = datetime.strptime(date_applied, '%Y-%m-%d').date()
    
    try:
        cursor.execute("""
            INSERT INTO job_applications 
            (dateApplied, company, jobTitle, status, contactName, contactEmail, jobUrl, notes, jobDescription)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            date_applied,
            company,
            job_title,
            status.upper(),
            kwargs.get('contact_name'),
            kwargs.get('contact_email'),
            kwargs.get('job_url'),
            kwargs.get('notes'),
            kwargs.get('job_description')
        ))
        
        new_id = cursor.fetchone()[0]
        conn.commit()
        
        print(f"✅ Added job application #{new_id}")
        print(f"   Company: {company}")
        print(f"   Position: {job_title}")
        print(f"   Date: {date_applied}")
        print(f"   Status: {status.upper()}")
        
    except Exception as e:
        print(f"❌ Error adding application: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

def update_status(app_id, new_status, notes=None):
    """Update job application status"""
    
    conn = get_db_connection()
    if not conn:
        return
    
    cursor = conn.cursor()
    
    try:
        # First, get current application details
        cursor.execute("""
            SELECT company, jobTitle, status FROM job_applications WHERE id = %s
        """, (app_id,))
        
        result = cursor.fetchone()
        if not result:
            print(f"❌ Job application #{app_id} not found")
            return
        
        company, job_title, old_status = result
        
        # Update status and notes
        update_query = "UPDATE job_applications SET status = %s, updatedAt = CURRENT_TIMESTAMP"
        params = [new_status.upper(), app_id]
        
        if notes:
            update_query += ", notes = %s"
            params.insert(-1, notes)
        
        update_query += " WHERE id = %s"
        
        cursor.execute(update_query, params)
        conn.commit()
        
        print(f"✅ Updated job application #{app_id}")
        print(f"   Company: {company}")
        print(f"   Position: {job_title}")
        print(f"   Status: {old_status} → {new_status.upper()}")
        if notes:
            print(f"   Notes: {notes}")
        
    except Exception as e:
        print(f"❌ Error updating application: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

def show_details(app_id):
    """Show detailed information for a job application"""
    
    conn = get_db_connection()
    if not conn:
        return
    
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            SELECT * FROM job_applications WHERE id = %s
        """, (app_id,))
        
        result = cursor.fetchone()
        if not result:
            print(f"❌ Job application #{app_id} not found")
            return
        
        # Unpack results
        (job_id, date_applied, company, job_title, status, contact_name, 
         contact_email, job_url, notes, job_description, created_at, updated_at) = result
        
        print(f"\n📋 Job Application #{job_id}")
        print("=" * 50)
        print(f"Company: {company}")
        print(f"Position: {job_title}")
        print(f"Status: {status}")
        print(f"Date Applied: {date_applied}")
        
        if contact_name:
            print(f"Contact: {contact_name}")
        if contact_email:
            print(f"Email: {contact_email}")
        if job_url:
            print(f"URL: {job_url}")
        if notes:
            print(f"Notes: {notes}")
        if job_description:
            print(f"Description: {job_description}")
        
        print(f"\nCreated: {created_at}")
        print(f"Updated: {updated_at}")
        
    except Exception as e:
        print(f"❌ Error getting application details: {e}")
    finally:
        cursor.close()
        conn.close()

def delete_application(app_id, confirm=False):
    """Delete a job application"""
    
    if not confirm:
        print("❌ Use --confirm flag to delete applications")
        return
    
    conn = get_db_connection()
    if not conn:
        return
    
    cursor = conn.cursor()
    
    try:
        # Get details before deleting
        cursor.execute("""
            SELECT company, jobTitle FROM job_applications WHERE id = %s
        """, (app_id,))
        
        result = cursor.fetchone()
        if not result:
            print(f"❌ Job application #{app_id} not found")
            return
        
        company, job_title = result
        
        # Delete the application
        cursor.execute("DELETE FROM job_applications WHERE id = %s", (app_id,))
        conn.commit()
        
        print(f"🗑️ Deleted job application #{app_id}")
        print(f"   Company: {company}")
        print(f"   Position: {job_title}")
        
    except Exception as e:
        print(f"❌ Error deleting application: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

def get_statistics():
    """Show job application statistics"""
    
    conn = get_db_connection()
    if not conn:
        return
    
    cursor = conn.cursor()
    
    try:
        # Overall stats
        cursor.execute("""
            SELECT 
                COUNT(*) as total,
                COUNT(DISTINCT company) as companies,
                MIN(dateApplied) as earliest,
                MAX(dateApplied) as latest
            FROM job_applications
        """)
        
        stats = cursor.fetchone()
        total, companies, earliest, latest = stats
        
        # Status breakdown
        cursor.execute("""
            SELECT status, COUNT(*) as count
            FROM job_applications
            GROUP BY status
            ORDER BY count DESC
        """)
        
        status_counts = cursor.fetchall()
        
        # Recent activity
        cursor.execute("""
            SELECT company, jobTitle, status, dateApplied
            FROM job_applications
            ORDER BY createdAt DESC
            LIMIT 5
        """)
        
        recent = cursor.fetchall()
        
        # Display results
        print(f"\n📊 Job Application Statistics")
        print("=" * 50)
        print(f"Total Applications: {total}")
        print(f"Unique Companies: {companies}")
        print(f"Date Range: {earliest} to {latest}")
        
        print(f"\n📈 Status Breakdown:")
        for status, count in status_counts:
            percentage = (count / total * 100) if total > 0 else 0
            print(f"  {status}: {count} ({percentage:.1f}%)")
        
        print(f"\n🕒 Recent Activity:")
        for company, title, status, date_applied in recent:
            print(f"  {date_applied} - {company}: {title[:40]} ({status})")
        
    except Exception as e:
        print(f"❌ Error getting statistics: {e}")
    finally:
        cursor.close()
        conn.close()

def main():
    parser = argparse.ArgumentParser(description='Manage job applications database')
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # List command
    list_parser = subparsers.add_parser('list', help='List job applications')
    list_parser.add_argument('--status', help='Filter by status')
    list_parser.add_argument('--company', help='Filter by company name')
    list_parser.add_argument('--limit', type=int, default=20, help='Limit results')
    
    # Add command
    add_parser = subparsers.add_parser('add', help='Add new job application')
    add_parser.add_argument('company', help='Company name')
    add_parser.add_argument('title', help='Job title')
    add_parser.add_argument('--date', help='Date applied (YYYY-MM-DD)')
    add_parser.add_argument('--status', default='APPLIED', help='Application status')
    add_parser.add_argument('--contact-name', help='Contact person')
    add_parser.add_argument('--contact-email', help='Contact email')
    add_parser.add_argument('--url', help='Job posting URL')
    add_parser.add_argument('--notes', help='Additional notes')
    
    # Update command
    update_parser = subparsers.add_parser('update', help='Update application status')
    update_parser.add_argument('id', type=int, help='Application ID')
    update_parser.add_argument('status', help='New status')
    update_parser.add_argument('--notes', help='Additional notes')
    
    # Show command
    show_parser = subparsers.add_parser('show', help='Show application details')
    show_parser.add_argument('id', type=int, help='Application ID')
    
    # Delete command
    delete_parser = subparsers.add_parser('delete', help='Delete application')
    delete_parser.add_argument('id', type=int, help='Application ID')
    delete_parser.add_argument('--confirm', action='store_true', help='Confirm deletion')
    
    # Stats command
    subparsers.add_parser('stats', help='Show statistics')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    if args.command == 'list':
        list_applications(args.status, args.company, args.limit)
    elif args.command == 'add':
        add_application(
            args.company, 
            args.title,
            args.date,
            args.status,
            contact_name=getattr(args, 'contact_name', None),
            contact_email=getattr(args, 'contact_email', None),
            job_url=args.url,
            notes=args.notes
        )
    elif args.command == 'update':
        update_status(args.id, args.status, args.notes)
    elif args.command == 'show':
        show_details(args.id)
    elif args.command == 'delete':
        delete_application(args.id, args.confirm)
    elif args.command == 'stats':
        get_statistics()

if __name__ == "__main__":
    main()