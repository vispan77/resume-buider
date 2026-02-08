import { Plus, Trash } from 'lucide-react';
import React from 'react'

function ProjectForm({ data, onChange }) {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: ""
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };


    return (
        <div>

            <div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                            Projects
                        </h3>
                        <p className="text-sm text-gray-500">
                            Add your projects
                        </p>
                    </div>

                    <button
                        onClick={addProject}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add Projects
                    </button>
                </div>

                {/* Experience List */}
                <div className="space-y-4 mt-6">
                    {data.map((project, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg space-y-4"
                        >

                            {/* Card Header */}
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium">
                                    Project #{index + 1}
                                </h4>

                                <button
                                    onClick={() => removeProject(index)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="grid gap-3">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={project.name}
                                    onChange={(e) =>
                                        updateProject(index, "name", e.target.value)
                                    }
                                    className="px-3 py-2 text-sm border rounded-lg"
                                />

                                <input
                                    type="text"
                                    placeholder="Project Type"
                                    value={project.type}
                                    onChange={(e) =>
                                        updateProject(index, "type", e.target.value)
                                    }
                                    className="px-3 py-2 text-sm border rounded-lg"
                                />

                                 <textarea
                                    rows={7}
                                    placeholder="Describe your project"
                                    value={project.description}
                                    onChange={(e) =>
                                        updateProject(index, "description", e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
                                />

                            
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProjectForm
