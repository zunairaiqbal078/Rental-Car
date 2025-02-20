import React, { useState } from "react";
import { FAQs } from "../../../Data/FAQ";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
function FaqSection() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center">
          <span className="text-yellow-500">Frequently</span> Asked Questions
        </h1>

        <div className="space-y-4">
          {FAQs.map((query) => (
            <details
              key={query.id}
              open={activeFAQ === query.id}
              className="p-6 rounded-lg shadow-sm"
            >
              <summary
                className="flex items-center justify-between text-lg font-bold cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveFAQ(activeFAQ === query.id ? null : query.id);
                }}
              >
                <span>{query.question}</span>
                {activeFAQ === query.id ? (
                  <IoIosArrowDropupCircle className="text-2xl text-cyan-800" />
                ) : (
                  <IoIosArrowDropdownCircle className="text-2xl text-gray-600" />
                )}
              </summary>
              {activeFAQ === query.id && (
                <p className="mt-4 text-gray-700">{query.answer}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
