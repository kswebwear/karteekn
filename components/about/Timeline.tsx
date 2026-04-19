const milestones = [
  {
    year: '2024–Now',
    title: 'Principal ServiceNow Architect',
    description: 'Enterprise-scale platform strategy, AI/ML integrations, and cross-functional technical leadership.',
  },
  {
    year: '2020–2024',
    title: 'Senior ServiceNow Architect',
    description: 'Led large-scale ITSM, HRSD, and CSM implementations for Fortune 500 clients. Deep custom app development with Flow Designer and IntegrationHub.',
  },
  {
    year: '2016–2020',
    title: 'ServiceNow Technical Lead',
    description: 'Specialized in complex integrations: REST/SOAP, MID Server, JDBC. Introduced performance engineering practices to delivery teams.',
  },
  {
    year: '2012–2016',
    title: 'ServiceNow Developer',
    description: 'Started with Service Catalog, Incident, and Change. Built custom portals and scripted business rules. Caught the platform bug early.',
  },
  {
    year: '2010–2012',
    title: 'IT Service Management Engineer',
    description: 'ITSM processes, on-premise tooling, and the slow realization that cloud platforms would change everything.',
  },
]

export default function Timeline() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
        Experience
      </p>
      <h2 className="mb-12 font-serif text-3xl text-white">The Journey</h2>

      <div className="relative">
        <div className="absolute left-3 top-2 h-full w-px bg-[#2a2a2a]" />

        <ul className="flex flex-col gap-10">
          {milestones.map((m, i) => (
            <li key={i} className="relative pl-10">
              <div className="absolute left-0 top-1.5 h-6 w-6 flex items-center justify-center rounded-full border border-amber-500/40 bg-[#0e0e0e]">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
              </div>
              <p className="mb-1 text-xs font-medium text-amber-500">{m.year}</p>
              <h3 className="mb-2 font-serif text-lg text-white">{m.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{m.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
