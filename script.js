// script.js
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const addNewBtn = document.getElementById("addNew");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("medicamentoForm");
  const tableBody = document.getElementById("medicamentosTable");

  const loadMedicamentos = () => {
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    medicamentos.forEach((medicamento) => {
      addMedicamentoToTable(medicamento);
    });
  };

  const addMedicamentoToTable = (medicamento) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${medicamento.nome}</td>
            <td>${medicamento.principioAtivo}</td>
            <td>${medicamento.concentracao}mg</td>
            <td>${medicamento.tarja}</td>
            <td>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
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
    medicamentos.push(medicamento);
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

    addMedicamentoToTable(medicamento);
    modal.style.display = "none";
    form.reset();
  };

  loadMedicamentos();
});
