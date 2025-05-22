
let currentData = {};
let originalData = {};
let data=  {
  contacts: [
    "📧 Email: sevincmrsll@gmail.com",
    "📞 Telefon: +994508657878",
    "📍 Doğum yeri: Naxçıvan şəhəri",
    "📅 Doğum tarixi: 15.06.2007",
    "📍 Yaşadığı yer: Bakı ş. N.Nərimanov r."
  ],
  education: [
    "Tam orta təhsil: Naxçıvan şəhəri 14 N saylı məktəb",
      "Hazırkı təhsil: Azərbaycan Texniki Universitet"
  ],
  skills: [
        "Layihə İdarəetməsi",
        "İctimaiyyətlə Əlaqələr",
        "Komanda ilə İşləmə bacarığı",
        "Zamanın İdarə Edilməsi",
        "Liderlik",
        "Effektiv Ünsiyyət"
  ],
  languages: [
    "yapon dili (A2)",
    "Ingilis dili",  
  ],
  
  profileText: "Mən Mürsəlli Sevinc 2007-ci il, 15 iyun tarixində Naxçıvan şəhərində anadan olmuşam.  Orta təhsilimi Naxçıvan şəhəri 14 nömrəli tam orta məktəbdə fərqlənmə attestatı ilə başa vurmuşam.Hazırda Azərbaycan Texniki Universitetində İnformasiya təhlükəsizliyi üzrə təhsil alıram və akademik biliklərimi daim inkişaf etdirməyə çalışıram.  Yüksək məsuliyyətli, öyrənməyə açıq bir insanam. Texnologiya və innovasiya sahələrinə xüsusi marağım var və bu istiqamətdə bilik və bacarıqlarımı artırmağa davam edirəm.Yeni komandalarla işləmək, praktiki təcrübə qazanmaq və özümü peşəkar sahədə inkişaf etdirmək üçün fürsətlər axtarıram. Əminəm ki, məsuliyyətli yanaşmam və öyrənməyə olan həvəsim mənə verilən tapşırıqları uğurla yerinə yetirməyə imkan verəcək.",
  githubLink: "https://github.com/Sevincmurselli"
};

function toggleSection(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
  }
  
  function addEducation() {
    const input = document.getElementById("edu-input");
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.textContent = input.value;
      document.getElementById("education-list").appendChild(li);
      input.value = "";
    }
  }
  
  function addExperience() {
    const input = document.getElementById("exp-input");
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.textContent = input.value;
      document.getElementById("experience-list").appendChild(li);
      input.value = "";
    }
  }
  function renderProfile(data) {
  for (let key in data) {
    const element = document.getElementById(key);
    if (element) {
      if (key === "githubLink") {
        element.innerHTML = `<a href="${data[key]}" target="_blank">${data[key]}</a>`;
      } else {
        element.textContent = data[key];
      }
    }
  }
}


window.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      originalData = data;
      const saved = localStorage.getItem("profileData");
      currentData = saved ? JSON.parse(saved) : { ...data };
      renderProfile(currentData);
    });
});

document.getElementById("resetAllBtn").addEventListener("click", () => {
  if (confirm("Bütün dəyişikliklər silinsin?")) {
    localStorage.removeItem("profileData");
    fetch("data.json")
      .then(res => res.json())
      .then(fetchedData => {
        currentData = fetchedData;
        data = fetchedData;
        localStorage.setItem("profileData", JSON.stringify(data));
        renderProfile(currentData);
        ["contacts", "education", "skills", "languages"].forEach(refreshList);
        document.getElementById("profile-text").textContent = data.profileText;
      });
  }
})
;document.getElementById("resetAllBtn").addEventListener("click", () => {
  if (confirm("Bütün dəyişikliklər silinsin?")) {
    localStorage.removeItem("profileData");
    location.reload(); 
  }
});
function createListItem(text, dataKey, index, isHtml = false) {
  const li = document.createElement("li");

  const contentSpan = document.createElement("span");
  contentSpan.innerHTML = isHtml ? text : text;
  contentSpan.style.marginRight = "10px";
  li.appendChild(contentSpan);

  const modifyBtn = document.createElement("button");
  modifyBtn.textContent = "✅";
  modifyBtn.title = "Modify";
  modifyBtn.style.marginRight = "5px";
  li.appendChild(modifyBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.title = "Delete";
  li.appendChild(deleteBtn);
  function addSkill() {
    const input = document.getElementById("skill-input");
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.textContent = input.value;
      document.getElementById("skills-list").appendChild(li);
      input.value = "";
    }
  }
  modifyBtn.addEventListener("click", () => {
    if (li.querySelector("input")) return;

    const current = isHtml ? contentSpan.innerHTML.replace(/<br>/g, " ") : contentSpan.textContent;
    contentSpan.style.display = "none";

    const input = document.createElement("input");
    input.type = "text";
    input.value = current;
    input.style.width = "70%";
    li.insertBefore(input, modifyBtn);
    input.focus();

    function finishEdit() {
      const val = input.value.trim();
      if (!val) return alert("Value cannot be empty!");
      if (isHtml) {
        contentSpan.innerHTML = val.replace(/\n/g, "<br>");
        data[dataKey][index] = val.replace(/\n/g, "<br>");
      } else {
        contentSpan.textContent = val;
        data[dataKey][index] = val;
      }
      li.removeChild(input);
      contentSpan.style.display = "";
    }

   

    input.addEventListener("blur", () => {
      if (li.contains(input)) finishEdit();
    });
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this item?")) {
      data[dataKey].splice(index, 1);
      li.remove();
      refreshList(dataKey);
    }
  });

  return li;
}

function refreshList(dataKey) {
  const selectors = {
    contacts: ".contact-list",
    education: ".education-list",
    skills: ".skills-list",
    languages: ".languages-list",
  };
  const isHtml = dataKey === "education";
  const ul = document.querySelector(selectors[dataKey]);
  if (!ul) return;
  ul.innerHTML = "";
  data[dataKey].forEach((item, index) => {
    ul.appendChild(createListItem(item, dataKey, index, isHtml));
  });
}

function handleEditableText({ elementId, dataKey, isLink = false }) {
  const wrapper = document.getElementById(elementId + "-wrapper");
  const display = document.getElementById(elementId);
  const editBtn = document.getElementById("edit-" + dataKey);
  const deleteBtn = document.getElementById("delete-" + dataKey);

  editBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = isLink ? data[dataKey] : display.textContent;
    input.style.width = "80%";
    wrapper.insertBefore(input, editBtn);
    display.style.display = "none";
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value.trim();
        if (!val) return alert("Value cannot be empty!");
        data[dataKey] = val;
        if (isLink) {
          display.href = val;
          display.textContent = val.replace(/^https?:\/\//, "");
        } else {
          display.textContent = val;
        }
        wrapper.removeChild(input);
        display.style.display = "";
      } else if (e.key === "Escape") {
        wrapper.removeChild(input);
        display.style.display = "";
      }
    });

    input.addEventListener("blur", () => {
      if (wrapper.contains(input)) {
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      }
    });
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Silmək istədiyinizə əminsiniz?")) {
      data[dataKey] = isLink ? "" : "Deleted";
      display.textContent = isLink ? "" : "Deleted";
      if (isLink) display.href = "#";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ["contacts", "education", "skills", "languages", ].forEach(refreshList);

  document.getElementById("profile-text").textContent = data.profileText;
  

  handleEditableText({ elementId: "profile-text", dataKey: "profileText" });
  

  const inputs = [
    { inputId: "addContact", dataKey: "contacts" },
    { inputId: "addEducation", dataKey: "education" },
    { inputId: "addSkill", dataKey: "skills" },
    { inputId: "addLang", dataKey: "languages" },
   
  ];

  inputs.forEach(({ inputId, dataKey }) => {
    const input = document.getElementById(inputId);
    input?.addEventListener("keydown", e => {
      if (e.key === "Enter" && input.value.trim()) {
        data[dataKey].push(input.value.trim());
        refreshList(dataKey);
        input.value = "";
      }
    });
  });

  document.querySelectorAll(".left-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (content?.classList.contains("section-content")) {
        content.classList.toggle("active");
      }
    });
  });
});
