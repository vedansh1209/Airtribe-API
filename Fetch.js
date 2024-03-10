// Create a new course
fetch('http://localhost:3000/courses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Course Name',
    max_seats: 100,
    start_date: '2024-03-20',
    instructor_id: 1
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Update course details
fetch('http://localhost:3000/courses/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Course Name',
    max_seats: 120,
    start_date: '2024-04-01'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Register for a course
fetch('http://localhost:3000/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    course_id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone_number: '1234567890',
    linkedin_profile: 'https://www.linkedin.com/in/johndoe/'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Update lead status
fetch('http://localhost:3000/leads/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'Accepted'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Search leads by name
fetch('http://localhost:3000/leads?name=John Doe')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Search leads by email
fetch('http://localhost:3000/leads?email=john.doe@example.com')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
