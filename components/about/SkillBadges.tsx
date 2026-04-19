const skillGroups = [
  {
    category: 'ServiceNow Modules',
    skills: ['ITSM', 'ITOM', 'HRSD', 'CSM', 'SecOps', 'GRC', 'SPM', 'FSM', 'TSOM'],
  },
  {
    category: 'Platform Development',
    skills: ['Flow Designer', 'IntegrationHub', 'App Engine', 'Scoped Apps', 'Custom Portals', 'Service Portal', 'UI Builder'],
  },
  {
    category: 'Integrations',
    skills: ['REST', 'SOAP', 'GraphQL', 'MID Server', 'JDBC', 'LDAP', 'SSO/SAML', 'OAuth 2.0'],
  },
  {
    category: 'AI & Automation',
    skills: ['Now Assist', 'Predictive Intelligence', 'Document Intelligence', 'Virtual Agent', 'Workflow Automation'],
  },
  {
    category: 'Languages & Tools',
    skills: ['JavaScript', 'TypeScript', 'Python', 'GlideScript', 'Node.js', 'Next.js', 'Git'],
  },
]

export default function SkillBadges() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
        Expertise
      </p>
      <h2 className="mb-10 font-serif text-3xl text-white">Skills & Stack</h2>

      <div className="flex flex-col gap-8">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-sm font-medium text-gray-400">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
