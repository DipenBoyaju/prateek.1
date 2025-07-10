import axios from "axios";
import { baseUrl } from "../../../../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";


const getSubProjectBySlug = async (slug) => {
  const res = await axios.get(`${baseUrl}/api/subProject/getProjectBySlug/${slug}`
  );
  return res.data;
}

const DasSubProjectDetail = () => {
  const { slug } = useParams();

  const { data: project } = useQuery({
    queryFn: () => getSubProjectBySlug(slug),
    queryKey: ['subProject'],
    enabled: !!slug
  })

  return (
    <div className="md:max-w-6xl md:mx-auto md:p-6 bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-300 pb-4 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row items-center md:space-x-5">
          <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono font-bold text-3xl w-20 h-20 flex items-center justify-center rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            {project?.divisionSymbol || "IMG"}
          </div>
          <div>
            <h1 className="text-lg md:text-3xl font-bold tracking-wide text-zinc-800">
              {project?.title}
            </h1>
            <p className="md:text-base font-quicksand font-semibold text-blue-700 mt-1 italic text-xs">{project?.division}</p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Left Column */}
        <div className="md:col-span-2">
          <p className="text-gray-600 leading-relaxed md:text-base whitespace-pre-line mb-6 text-sm">
            {project?.description}
          </p>

          {project?.datasetLink && (
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-blue-700">Dataset Link</h2>
              <a
                href={project.datasetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 font-normal hover:underline text-sm break-words"
              >
                {project?.datasetLink}
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Team Members */}
        <div className="space-y-4">
          {project?.teamMember && project?.teamMember.length > 0 && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-700">Team Members</h2>
              <div className="space-y-4">
                {project?.teamMember.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex items-center space-x-4"
                  >
                    <img
                      src={member.image}
                      alt={`${member.name} avatar`}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-gray-900 font-semibold text-base">{member.name}</div>
                      <div className="text-gray-500 text-sm">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Partner Organizations - Full Width, 2-3 Column Grid */}
      {project?.partnerOrganization && project?.partnerOrganization.length > 0 && (
        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-6 text-blue-700">Partner Organizations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {project?.partnerOrganization.map((org, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col border border-zinc-800/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-semibold text-base md:text-base text-zinc-800">
                    {org.name}
                    {org.website && (
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600"
                      >
                        <ExternalLink
                          strokeWidth={1.5}
                          size={15}
                          className="hover:text-indigo-800 transition"
                        />
                      </a>
                    )}
                  </div>

                  {org.logo ? (
                    <img
                      src={org.logo}
                      alt={`${org.name} logo`}
                      className="h-10 w-auto object-contain rounded"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gray-300 rounded flex items-center justify-center text-gray-500 font-semibold text-sm">
                      N/A
                    </div>
                  )}
                </div>

                <div className="text-gray-600 text-sm mb-2">
                  {org.address && <div>{org.address}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DasSubProjectDetail;
