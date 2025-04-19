document.addEventListener('DOMContentLoaded', () => {

    const providersTableBody = document.querySelector('#providers-table tbody');
    const addProviderToggleBtn = document.getElementById('add-provider-toggle-btn');
    const addProviderForm = document.getElementById('add-provider-form');
    const newProviderNameInput = document.getElementById('new-provider-name');
    const saveProviderBtn = document.getElementById('save-provider-btn');
    const cancelAddProviderBtn = document.getElementById('cancel-add-provider-btn');

    const modal = document.getElementById('confirmation-modal');
    const modalText = document.getElementById('modal-confirmation-text');
    const closeModalBtn = modal.querySelector('.close-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');
    const submitRequestBtn = document.getElementById('submit-request-btn');

    let currentlyConfirmingRow = null; // To store the row being processed

    // --- Helper Function to Format Date ---
    function formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // --- Event Listener for Table Actions (Send Request) ---
    providersTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('send-request-btn')) {
            const button = event.target;
            const row = button.closest('tr');
            currentlyConfirmingRow = row; // Store the row
            const providerName = row.querySelector('td:first-child').textContent;

            // Update modal text and show modal
            modalText.textContent = `Are you sure you want to send a connection request to ${providerName}? This allows them to sync your health records.`;
            modal.classList.remove('hidden');
        }
    });

    // --- Modal Close Actions ---
    const closeModal = () => {
        modal.classList.add('hidden');
        currentlyConfirmingRow = null; // Clear the stored row
    };

    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    // Optional: Close modal if clicked outside the content
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // --- Modal Submit Action ---
    submitRequestBtn.addEventListener('click', () => {
        if (currentlyConfirmingRow) {
            const statusCell = currentlyConfirmingRow.querySelector('.status-action');
            const dateCell = currentlyConfirmingRow.querySelector('.date-info');

            if (statusCell && dateCell) {
                // Update Status Cell
                statusCell.innerHTML = 'Request Sent'; // Replace button with text
                statusCell.classList.remove('status-action');
                statusCell.classList.add('status-sent'); // Add class for styling

                // Update Date Cell
                dateCell.textContent = `Sent: ${formatDate(new Date())}`;
                dateCell.classList.remove('date-info');
                dateCell.classList.add('date-sent'); // Add class for styling
            }
            closeModal(); // Close modal after action
        }
    });

    // --- Add Provider Form Toggle ---
    addProviderToggleBtn.addEventListener('click', () => {
        addProviderForm.classList.toggle('hidden');
        if (!addProviderForm.classList.contains('hidden')) {
            newProviderNameInput.focus();
            addProviderToggleBtn.innerHTML = '<i class="fas fa-minus"></i> Cancel Adding'; // Change button text/icon
        } else {
             addProviderToggleBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Provider';
        }

    });

     // --- Cancel Adding Provider ---
    cancelAddProviderBtn.addEventListener('click', () => {
        addProviderForm.classList.add('hidden');
        newProviderNameInput.value = ''; // Clear input
         addProviderToggleBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Provider'; // Reset toggle button
    });

    // --- Save New Provider ---
    saveProviderBtn.addEventListener('click', () => {
        const providerName = newProviderNameInput.value.trim();
        if (providerName) {
            // Create new table row
            const newRow = document.createElement('tr');
            const newProviderId = Date.now(); // Simple unique ID generation
            newRow.dataset.providerId = newProviderId;

            newRow.innerHTML = `
                <td>${providerName}</td>
                <td class="status-action"><button class="send-request-btn">Send Request</button></td>
                <td class="date-info"></td>
            `;

            // Append to table
            providersTableBody.appendChild(newRow);

            // Clear input and hide form
            newProviderNameInput.value = '';
            addProviderForm.classList.add('hidden');
            addProviderToggleBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Provider'; // Reset toggle button


        } else {
            alert('Please enter a provider name.');
        }
    });

});