# Famima Grid - Development Plan

## Current State

- Next.js 15 family photo gallery with individual person pages
- Static photo serving from `/public/photos/[name]/`
- Basic UI with theme support and responsive design
- Photo metadata extraction (dates) and chronological sorting

## Priority Next Steps

### 1. **Photo Upload System** (Critical)

- Add admin interface for photo uploads
- Support drag-and-drop bulk uploads
- Auto-organize photos by person/folder
- Image compression and optimization

### 2. **User Authentication** (Critical)

- Simple admin login system
- Protect upload/management features
- Guest view vs admin view

### 3. **Content Management** (High)

- Photo deletion/editing interface
- Person profile management (names, dates, colors)
- Bulk operations (move photos between people)

### 4. **Performance & UX** (Medium)

- Image lazy loading and progressive loading
- Photo caching and CDN optimization
- Mobile-responsive improvements
- Loading states and error handling

### 5. **Deployment & DevOps** (Medium)

- Environment configuration
- Automated deployment pipeline
- Database for metadata (optional - could stay file-based)
- Backup strategy for photos

### 6. **Advanced Features** (Low)

- Photo sharing links
- Family tree visualization
- Photo search and filtering
- Export functionality

## Tech Stack Recommendations

- **Database**: Start with file system, migrate to PostgreSQL if needed
- **Storage**: Local files → AWS S3/Cloudflare R2 for scale
- **Auth**: NextAuth.js or simple JWT
- **Upload**: react-dropzone + sharp for processing

## Success Metrics

- [ ] Admin can upload photos via web interface
- [ ] Photos auto-organize by person
- [ ] Site loads fast with 100+ photos per person
- [ ] Mobile-friendly experience
- [ ] Zero-downtime deployments
