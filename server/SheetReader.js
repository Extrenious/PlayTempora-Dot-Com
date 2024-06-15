document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/data/UpdateLog')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const logContainer = document.getElementById('UpdateLogContainer');
          if (!logContainer) {
              throw new Error('Log container not found');
          }

          data.forEach((row, index) => {
            if (index === 0) return; // Skip header row

            const utcTimestamp = row[0]; // UTC timestamp
            const author = row[1]; // Author of the message
            const place = row[2]; // Place where the message was said
            const message = row[3]; // Message content
    
            // Convert the UTC timestamp to a date object
            const postDate = new Date(parseInt(utcTimestamp) * 1000);
    
            // Calculate the time difference
            const now = new Date();
            const timeDiff = Math.abs(now - postDate);

             // Calculate differences in time
        const diffYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
        const diffDays = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Create a string to display the time ago
        let timeAgo = '';
        if (diffYears > 0) {
          timeAgo = `${diffYears} years ago`;
        } else if (diffDays > 0) {
          timeAgo = `${diffDays} days ago`;
        } else if (diffHours > 0) {
          timeAgo = `${diffHours} hours ago`;
        } else if (diffMinutes > 0) {
          timeAgo = `${diffMinutes} minutes ago`;
        } else {
          timeAgo = `${diffSeconds} seconds ago`;
        }

        // Create figure element
        const logEntry = document.createElement('figure');
        logEntry.classList.add('log-entry');

            // Create blockquote element
            const blockquote = document.createElement('blockquote');
            blockquote.classList.add('blockquote');
    
            // Create paragraph for the main content
            const p = document.createElement('p');
            p.textContent = message;
    
            // Create figcaption element
            const figcaption = document.createElement('figcaption');
            figcaption.classList.add('blockquote-footer');
            figcaption.innerHTML = `Posted ${timeAgo} by <strong>${author}</strong> in <em>${place}</em>`;
    
            // Append elements
            blockquote.appendChild(p);
            logEntry.appendChild(blockquote);
            logEntry.appendChild(figcaption);
            logContainer.appendChild(logEntry);
          });
        })

      .catch(error => {
          console.error('Error fetching or processing data:', error);
      });
});
 