# selenium dependencies
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

waiting_time = 1000
options = Options()
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

driver.get("http://localhost:3000/")

# click on "quick question button"
quickQuestionButton = WebDriverWait(driver, waiting_time).until(
    EC.element_to_be_clickable((By.ID, 'quickQuestion')))
print("quick")
num_responses = len(driver.find_elements_by_class_name("lexResponse"))
print(num_responses)
quickQuestionButton.click()

inputField = driver.find_element_by_id("inputField")

def sendQuestion(user_request):
    while(True):
        new_num_responses = len(driver.find_elements_by_class_name("lexResponse"))
        if(new_num_responses > num_responses):
            inputField.send_keys(user_request)
            inputField.send_keys(Keys.RETURN)
            return new_num_responses
            break

# AFTER 20 need to ask QUICK QUESTION AGAIN!!!
user_request_list = ["How do I network with cwru alumni",
                     "How can I get my technical electives approved",
                     "How can I plan my classes for future semester",
                     "Where do I look for a co-op",
                     "Is there any way to get into a class that's full",
                     "Which depth track should I choose",
                     "How much work is a BS vs a BA",
                     "Are there any entrepreneurship programs",
                     "What clubs can I join",
                     "Where can I download software for my classes",
                     "how early should I take intro to ai",
                     "how can I get internships",
                     "How do I know if CS is a good fit for me",
                     "Where can I find employers that are actively hiring",
                     "Where do I find leadership opportunities",
                     "Am I going to be overwhelmed by CS",
                     "What resources are available for women",
                     "Who can I ask for advice from the student perspective",
                     "Does CWRU offer career services",
                     "Quick Question",
                     "Can I be a CS major if I don't know how to code",
                     "Does CWRU have english learning resources",
                     "Where do I buy textbooks",
                     "How can I get a tutor for free",
                     "Can I get help with writing my essay",
                     "How do I find research opportunities",
                     "Where can I find my major requirements",
                     "Do I need a masters degree to get a job",
                     "Can I study abroad and complete my degree in four years",
                     "How do I know if Im in good academic standing",
                     "Im looking for volunteer opportunities"
                    ]

for user_request in user_request_list:
    num_responses = sendQuestion(user_request)

# ask every question and get a response


# open a new tab

# click on every "FAQ"

# open a new tab

# click on "Menu" button

# go through every possible part of the menu


# driver.quit()
