class Review {
    constructor() {  
      const reviewForm = document.querySelector('#review-form');
      if (reviewForm) {
          this.doReview = this.doReview.bind(this);
          reviewForm.addEventListener('submit', this.doReview);
          console.log("Review form found and event listener added");
      } else {
          console.log("Review form not found");
      }
    }

    async doReview(event) {
        event.preventDefault();
        const movieTitle = document.querySelector("#movietitle").value;
        const reviewText = document.querySelector("#review").value; 

        const reviewBody = {
          movieTitle,
          reviewText
        };

        const fetchOptions = {
           method: 'POST',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
           body: JSON.stringify(reviewBody)
        };
        
        console.log(reviewBody);
        
        try {
            const response = await fetch('/reviews/', fetchOptions);
            if (response.ok) {
              console.log("Review submitted successfully");
              window.location.href = '/reviews.html'; 
            } else {
              const errorText = await response.text();
              console.error("Error submitting review:", errorText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }
}

// Init Review instance
new Review();

