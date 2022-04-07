export function trackSynchronize(payload) {
  if (window.analytics) {
    const projectId = payload.projectId
    window.analytics.track('Synchronize triggered', {
      projectId,
    })
  }
}
export function trackOptimize(payload) {
  if (window.analytics) {
    const projectId = payload.projectId
    window.analytics.track('Optimization triggered', {
      projectId,
    })
  }
}

export function trackDatasetActivated(payload) {
  if (window.analytics) {
    const projectId = payload.projectId
    const datasetName = payload.datasetName
    const activated = payload.activated
    window.analytics.track(`Dataset ${activated ? 'activated' : 'deactivated'}`, {
      projectId,
      datasetName,
      activated,
    })
  }
}

export function trackDeleteAllMaterializedViews(payload) {
  if (window.analytics) {
    const projectId = payload.projectId
    window.analytics.track(`Materialized Views deleted`, {
      projectId,
    })
  }
}

export function trackDeleteProject(payload) {
  if (window.analytics) {
    const projectId = payload.projectId
    window.analytics.track(`Project deleted`, {
      projectId,
    })
  }
}

export function trackOpenStripePortal() {
  if (window.analytics) {
    window.analytics.track(`Stripe portal opened`)
  }
}

export function trackIdentify({ id, name, email, teamName }) {
  if (window.analytics) {
    window.analytics.identify(id, { name, email, teamName })
  }
}

export function trackPage({ pageName }) {
  if (window.analytics) {
    window.analytics.page(pageName)
  }
}
