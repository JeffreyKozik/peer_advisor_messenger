# PAM (Peer Advisor Messenger) Chatbot

# INTRO & PURPOSE
- PAM, which stands for Peer Advisor Messenger is a chatbot that is intended to be used by either prospective Case Western Reserve University students or current Case Western Reserve University students to assist them by answering questions they have about academics, extracurriculars, their career, and other topics. 
- It was built using React as the frontend with the chatbot functionality being from Amazon Web Services “Lex”. Some of the questions that PAM can answer include “Should I get my Masters degree in CS?” as well as “Should I study abroad” in which PAM can get information about things like the student’s major, semester, and where they want to study abroad. 
- PAM is also intelligent enough to not have to be asked a question exactly right by the student, instead it’s able to figure out what the student is probably asking using AWS Lex’s inbuilt natural language processing capabilities. 

# FEATURES
- We also have some questions where Lex picks out of a few potential answers to a question and gives one randomly. For example if the student asks “Should I major in CS?” PAM picks from 1 of 3 answers randomly to give the student. Then if the student would like to see all of the answers, they can click “see more” to expand the response and see all three answers that PAM has. 
<img width="408" alt="image" src="https://user-images.githubusercontent.com/29404461/163715638-3c523042-2863-4ff0-80ae-c20b78b8d62f.png">
- PAM supports embedded links or any other type of html such as ordered lists <img width="243" alt="image" src="https://user-images.githubusercontent.com/29404461/163715670-0927e0ef-56bd-4bcc-9471-2a65031ea20f.png">
- PAM also supports "response cards" with pictures and interactive buttons <img width="200" alt="image" src="https://user-images.githubusercontent.com/29404461/163715682-34e72e66-fde3-4d94-b9b9-507800703daf.png">
- If a question is asked that PAM doesn't know, PAM provides a link to the search results page on CWRU's website <img width="406" alt="image" src="https://user-images.githubusercontent.com/29404461/163715694-94fbd57e-6e88-44a5-8fcc-1e9eed38e055.png">
- Currently, this chatbot will be provided as a link on a page on CWRU’s website, but in the future it can be integrated as a popup on the CWRU webpage. 
- We also created a graph showing the question flow that PAM asks. 

# FUTURE DEVELOPMENT
- In the future, people who continue the work of this project can easily add more questions, and can also view various statistics around what type of questions students tend to be asking and how satisfied they seem to be with their responses.
- Also, right now this chatbot centers around answering computer science specific questions but in the future it can be expanded to answer questions about other majors as well. 
- The end goal of this project is also so that human peer advisors don’t have to handle such a high amount of students every day and answer questions over and over again, instead the human peer advisors can spend their time talking about deeper topics with students while PAM can be used to answer quick questions for the students. 
