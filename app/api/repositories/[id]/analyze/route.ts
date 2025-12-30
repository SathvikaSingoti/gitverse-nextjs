import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware'
import { repositoryService } from '@/lib/services/repositoryService'

// Increase timeout and use Node.js runtime (edge doesn't have git)
export const maxDuration = 300
export const runtime = 'nodejs'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth(request)
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid repository ID' }, { status: 400 })
    }

    // Verify ownership
    const repository = await repositoryService.getRepository(id, user.userId)

    if (!repository) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
    }

    // Update status immediately
    await repositoryService.updateRepositoryStatus(id, 'analyzing')

    console.log(`Starting analysis for repository ${id}: ${repository.url}`)

    // Run analysis and await completion
    try {
      await repositoryService.analyzeRepository(id)
      console.log(`Analysis completed successfully for repository ${id}`)
      return NextResponse.json({ 
        message: 'Analysis completed', 
        status: 'completed',
        repositoryId: id 
      })
    } catch (analysisError: any) {
      console.error(`Analysis failed for repository ${id}:`, analysisError)
      console.error('Error stack:', analysisError.stack)
      await repositoryService.updateRepositoryStatus(id, 'failed')
      return NextResponse.json({ 
        error: 'Analysis failed', 
        details: analysisError.message,
        status: 'failed'
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Analyze repository error:', error)
    return NextResponse.json({ error: 'Failed to start analysis' }, { status: 500 })
  }
}
