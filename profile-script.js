document.addEventListener('DOMContentLoaded', function() {

    const recordsGrid = document.getElementById('records-grid');
    const editPanel = document.getElementById('edit-panel');
    const panelCloseBtn = document.getElementById('panel-close-btn');
    const panelOverlay = document.getElementById('panel-overlay');
    const panelTitle = document.getElementById('panel-title');
    const panelForm = document.getElementById('panel-form');
    const panelDetailsTextarea = document.getElementById('panel-details');
    const panelNotesTextarea = document.getElementById('panel-notes');
    const panelEditBtn = document.getElementById('panel-edit-btn');
    const panelSaveBtn = document.getElementById('panel-save-btn');
    const panelCancelBtn = document.getElementById('panel-cancel-btn');

    let currentCardData = {}; // To store data of the card that opened the panel

    // --- Open Panel ---
    function openPanel(cardElement) {
        // Get data from the clicked card's data attributes
        const recordType = cardElement.dataset.recordType || 'Details';
        const details = cardElement.dataset.details || '';
        const notes = cardElement.dataset.notes || '';

        currentCardData = { recordType, details, notes }; // Store for potential save

        // Populate panel
        panelTitle.textContent = `${recordType}`; // Set panel title
        panelDetailsTextarea.value = details;
        panelNotesTextarea.value = notes;

        // Ensure it starts in display mode
        setEditMode(false); // Make fields readonly, show correct buttons

        // Show panel and overlay
        editPanel.classList.add('is-open');
        panelOverlay.classList.add('is-visible');
        document.body.classList.add('panel-open'); // Optional: prevent body scroll
    }

    // --- Close Panel ---
    function closePanel() {
        editPanel.classList.remove('is-open');
        panelOverlay.classList.remove('is-visible');
        document.body.classList.remove('panel-open'); // Optional: allow body scroll
        // Reset edit mode in case it was left open
        setEditMode(false);
    }

    // --- Set Edit Mode ---
    function setEditMode(isEditable) {
        if (isEditable) {
            editPanel.classList.add('edit-mode');
            panelDetailsTextarea.readOnly = false;
            panelNotesTextarea.readOnly = false;
            panelEditBtn.style.display = 'none';
            panelSaveBtn.style.display = 'inline-block';
            panelCancelBtn.style.display = 'inline-block';
            // Optional: focus first editable field
            panelDetailsTextarea.focus();
        } else {
            editPanel.classList.remove('edit-mode');
            panelDetailsTextarea.readOnly = true;
            panelNotesTextarea.readOnly = true;
            panelEditBtn.style.display = 'inline-block';
            panelSaveBtn.style.display = 'none';
            panelCancelBtn.style.display = 'none';
            // Restore original values if cancelled mid-edit
             panelDetailsTextarea.value = currentCardData.details || '';
             panelNotesTextarea.value = currentCardData.notes || '';
        }
    }

    // --- Event Listeners ---

    // Click on Record Card (using Event Delegation)
    if (recordsGrid) {
        recordsGrid.addEventListener('click', function(event) {
            const clickedCard = event.target.closest('.record-card');
            if (clickedCard) {
                openPanel(clickedCard);
            }
        });
    }

    // Close button
    if (panelCloseBtn) {
        panelCloseBtn.addEventListener('click', closePanel);
    }

    // Overlay click
    if (panelOverlay) {
        panelOverlay.addEventListener('click', closePanel);
    }

    // Edit button
    if (panelEditBtn) {
        panelEditBtn.addEventListener('click', () => setEditMode(true));
    }

    // Cancel button
    if (panelCancelBtn) {
        panelCancelBtn.addEventListener('click', () => setEditMode(false)); // Revert to display mode
    }

    // Save button (Placeholder - implement actual save logic here)
    if (panelSaveBtn) {
        panelSaveBtn.addEventListener('click', function() {
            // 1. Get current values from form fields
            const newDetails = panelDetailsTextarea.value;
            const newNotes = panelNotesTextarea.value;

            // 2. **IMPORTANT**: Send this data to your server/backend to save it.
            console.log('Saving data for:', currentCardData.recordType);
            console.log('New Details:', newDetails);
            console.log('New Notes:', newNotes);
            // Example: fetch('/api/update-record', { method: 'POST', body: JSON.stringify(...) })

            // 3. Update the card's data attributes (optional, for immediate UI reflection)
            //    Find the original card based on currentCardData.recordType if needed
            //    cardElement.dataset.details = newDetails;
            //    cardElement.dataset.notes = newNotes;

            // 4. Update currentCardData to reflect saved state
             currentCardData.details = newDetails;
             currentCardData.notes = newNotes;

            // 5. Switch back to display mode
            setEditMode(false);

            // Optionally show a success message
            alert('Changes saved (simulation)!');

            // You might want to close the panel after saving, or keep it open
            // closePanel();
        });
    }

     // Handle Escape key to close panel
     document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && editPanel.classList.contains('is-open')) {
            closePanel();
        }
    });

}); // End DOMContentLoaded