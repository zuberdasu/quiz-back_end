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

  addScore: (token, score, topic) => {
    return `INSERT INTO scores (score, user_id, topic_id) 

    SELECT "${score}", logins.user_id, topics.id
      FROM logins
          JOIN topics 
              ON topics.name = "${topic}"
                WHERE token = "${token}";`;
  },

  getUserId: (token) => {
    return `SELECT user_id FROM logins
              WHERE token = "${token}";`;
  },
  getTopicId: (topic) => {
    return `SELECT id FROM topics
              WHERE name = "${topic}";`;
  },
  getScores: (userId, topicId) => {
    return `SELECT MAX(score) FROM scores
    	        WHERE user_id = "${userId}"
        	      AND topic_id = "${topicId}";`;
  },
};

module.exports = queries;
