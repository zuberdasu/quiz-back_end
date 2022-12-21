const queries = {
  createUser: (firstName, surname, email, password) => {
    return `INSERT IGNORE users 
                    (first_name, surname, email, password)
                         VALUES
                            ( "${firstName}","${surname}","${email}", "${password}");`;
  },

  checkCreds: (email, password) => {
    return `SELECT id
                FROM users
                    WHERE 
                        email = "${email}"
                            AND 
                                password = "${password}";`;
  },

  addToken: (user_id, token) => {
    return `INSERT INTO logins
                    (user_id, token)
                            VALUES
                                (${user_id}, "${token}");`;
  },

  removeToken: (token) => {
    return `DELETE FROM logins
                WHERE token = "${token}";`;
  },
  getQuestions: (topic) => {
    return `SELECT name, question, questions.id
              FROM topics
                JOIN questions ON
                  topics.id = questions.topic_id;`;
  },
};

module.exports = queries;

// WHERE topics.name = "${topic}";`;
//JOIN answers ON
//                    questions.id = answers.question_id;`;
//
