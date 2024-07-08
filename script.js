// script.js
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const addNewBtn = document.getElementById("addNew");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("medicamentoForm");
  const tableBody = document.getElementById("medicamentosTable");

  let editIndex = null;

  const loadMedicamentos = () => {
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    medicamentos.forEach((medicamento, index) => {
      addMedicamentoToTable(medicamento, index);
    });
  };

  const addMedicamentoToTable = (medicamento, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${medicamento.nome}</td>
            <td>${medicamento.principioAtivo}</td>
            <td>${medicamento.concentracao}mg</td>
            <td>${medicamento.tarja}</td>
            <td>
                <button class="edit-btn" onclick="editMedicamento(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteMedicamento(${index})">🗑️</button>
            </td>
        `;
    tableBody.appendChild(newRow);
  };

  addNewBtn.onclick = () => {
    modal.style.display = "block";
  };

  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  form.onsubmit = (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const principioAtivo = document.getElementById("principioAtivo").value;
    const concentracao = document.getElementById("concentracao").value;
    const tarja = document.getElementById("tarja").value;

    const medicamento = { nome, principioAtivo, concentracao, tarja };
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];

    if (editIndex !== null) {
      medicamentos[editIndex] = medicamento;
      editIndex = null;
    } else {
      medicamentos.push(medicamento);
    }

    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

    tableBody.innerHTML = "";
    loadMedicamentos();
    modal.style.display = "none";
    form.reset();
  };

  window.editMedicamento = (index) => {
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    const medicamento = medicamentos[index];

    document.getElementById("nome").value = medicamento.nome;
    document.getElementById("principioAtivo").value =
      medicamento.principioAtivo;
    document.getElementById("concentracao").value = medicamento.concentracao;
    document.getElementById("tarja").value = medicamento.tarja;

    editIndex = index;
    modal.style.display = "block";
  };

  window.deleteMedicamento = (index) => {
    let medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    medicamentos.splice(index, 1);
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
    tableBody.innerHTML = "";
    loadMedicamentos();
  };

  loadMedicamentos();
});
