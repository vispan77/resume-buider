import React, { useState } from "react";
import { Briefcase, Plus, Trash, Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";

function ExperienceForm({ data = [], onChange }) {

  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleCurrentChange = (index, checked) => {
    const updated = [...data];
    updated[index].is_current = checked;
    if (checked) updated[index].end_date = "";
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    // const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`;
    const prompt = `You are an expert in resume writing. Your task is to enhance the 
    job description of a resume. The job description should be 1-2 sentence also
     highlighting key responsibilities and achievement. use action words and quantifiable 
     results where possible. make it  ATS friendly and only return text no options or 
     anything else, only return the to the point response dont say anyword 
     ${experience.description} for the position of ${experience.position} at 
     ${experience.company}`;

    try {
      const { data } = await api.post("/api/ai/enhance-job-desc", { userContent: prompt }, { headers: { Authorization: token } });
      updateExperience(index, "description", data.enhancedContent)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your job experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click “Add Experience” to get started.</p>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {data.map((experience, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >

            {/* Card Header */}
            <div className="flex justify-between items-center">
              <h4 className="font-medium">
                Experience #{index + 1}
              </h4>

              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Company Name"
                value={experience.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="px-3 py-2 text-sm rounded-lg border"
              />

              <input
                type="text"
                placeholder="Job Title"
                value={experience.position}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                className="px-3 py-2 text-sm rounded-lg border"
              />

              <input
                type="month"
                value={experience.start_date}
                onChange={(e) =>
                  updateExperience(index, "start_date", e.target.value)
                }
                className="px-3 py-2 text-sm rounded-lg border"
              />

              <input
                type="month"
                value={experience.end_date}
                disabled={experience.is_current}
                onChange={(e) =>
                  updateExperience(index, "end_date", e.target.value)
                }
                className="px-3 py-2 text-sm rounded-lg border disabled:bg-gray-100"
              />
            </div>

            {/* Current Job */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={experience.is_current}
                onChange={(e) =>
                  handleCurrentChange(index, e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                Currently working here
              </span>
            </label>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Job Description
                </label>

                <button
                  onClick={() => generateDescription(index)}
                  disabled={generatingIndex === index || !experience.position || !experience.company}
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition"
                >
                  {
                    generatingIndex === index ?
                      (<Loader2 className="w-3 h-3 animate-spin" />) :
                      (<Sparkles className="w-3 h-3" />)
                  }

                  Enhance with AI
                </button>
              </div>

              <textarea
                rows={6}
                placeholder="Describe your responsibilities and achievements..."
                value={experience.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="w-full text-sm px-3 py-2 rounded-lg border resize-none"
              />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceForm;

