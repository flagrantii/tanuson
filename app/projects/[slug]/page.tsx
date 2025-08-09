import ProjectDemo from '@/components/projects/ProjectDemo'
import ProjectFeatures from '@/components/projects/ProjectFeatures'
import ProjectGallery from '@/components/projects/ProjectGallery'
import ProjectHeader from '@/components/projects/ProjectHeader'
import ProjectLinks from '@/components/projects/ProjectLinks'
import ProjectTechStack from '@/components/projects/ProjectTechStack'
import { findProjectBySlug, getAllProjectSlugs } from '@/lib/projects'

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = findProjectBySlug(slug)

  if (!project) {
    return (
      <div className="px-6 lg:px-8 mx-auto max-w-4xl py-16">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <a className="underline underline-offset-4 mt-2 inline-block" href="/projects">Back to Projects</a>
      </div>
    )
  }

  return (
    <div className="px-6 lg:px-8 mx-auto max-w-4xl py-16">
      <ProjectHeader title={project.title} date={project.date} />

      <p className="mt-6 text-gray-700">{project.description}</p>

      <ProjectDemo isDemo={project.isDemo} liveUrl={project.links?.live} />

      <ProjectFeatures features={project.features} />

      <ProjectTechStack techStack={project.techStack} />

      <ProjectGallery images={project.images} />

      <ProjectLinks live={project.links?.live} repo={project.links?.repo} />
    </div>
  )
} 