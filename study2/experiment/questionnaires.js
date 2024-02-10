// Depression-Anxiety (Patient Health Questionnaire-4, PHQ-4)
var PHQ4_instructions =
    "<p><b>About your emotions...</b></p>" +
    "<p>Over the <b>last 2 weeks</b>, how often have you been bothered by the following problems?</p>"

var PHQ4_items = [
    "Feeling nervous, anxious or on edge",
    "Not being able to stop or control worrying",
    "Feeling down, depressed, or hopeless",
    "Little interest or pleasure in doing things",
]

var PHQ4_dimensions = ["PHQ4_Anxiety_1", "PHQ4_Anxiety_2", "PHQ4_Depression_3", "PHQ4_Depression_4"]

// Questionnaire ========================================================================

function phq4() {
    condition = jsPsych.randomization.sampleWithoutReplacement(["PHQ4", "PHQ4R"], 1)[0]

    if (condition == "PHQ4") {
        labels = [
            "<br>Not at all",
            "<br>Several days",
            "<br>More than half the days",
            "<br>Nearly every day",
        ]
    } else if (condition == "PHQ4R") {
        labels = [
            "<br>Not at all",
            "<br>Once or twice", // New option
            "<br>Several days",
            "<br>More than half the days",
            "<br>Nearly every day",
        ]
    }

    PHQ4_questions = []
    for (const [index, element] of PHQ4_items.entries()) {
        PHQ4_questions.push({
            prompt: "<b>" + element + "</b>",
            name: PHQ4_dimensions[index],
            labels: labels,
            required: true,
        })
    }

    return {
        type: jsPsychSurveyLikert,
        questions: PHQ4_questions,
        randomize_question_order: false,
        preamble: PHQ4_instructions,
        data: {
            screen: "questionnaire_phq4",
            condition: condition,
        },
    }
}

// STAIT-5 (Zsido, 2020) ========================================================================
var stai5_items = [
    "I feel that difficulties are piling up so that I cannot overcome them",
    "I worry too much over something that really doesn't matter",
    "Some unimportant thoughts run through my mind and bothers me",
    "I take disappointments so keenly that I can't put them out of my mind",
    "I get in a state of tension or turmoil as I think over my recent concerns and interests",
]

var stai5_dimensions = ["STAI5_1", "STAI5_2", "STAI5_3", "STAI5_4", "STAI5_5"]

stai5_questions = []
for (const [index, element] of stai5_items.entries()) {
    stai5_questions.push({
        prompt: "<b>" + element + "</b>",
        name: stai5_dimensions[index],
        labels: ["<br>Not at all", "<br>Somewhat", "<br>Moderately so", "<br>Very much so"],
        required: true,
    })
}

var stai5 = {
    type: jsPsychSurveyLikert,
    css_classes: ["narrow-text"],
    questions: stai5_questions,
    randomize_question_order: false,
    preamble:
        "<p style='text-align: left;'>A number of statements which people have used to describe themselves are given below. Read each statement and then circle the number at the end of the statement that indicates " +
        // "HOW YOU FEEL RIGHT NOW. " +
        "how you have been feeling <b>during the past two weeks</b>. " +
        "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_stai5",
    },
}

// IAS questionnaire ========================================================================
var IAS_items = [
    "I can always accurately perceive when my heart is beating fast",
    "I can always accurately perceive when I am hungry",
    "I can always accurately perceive when I am breathing fast",
    "I can always accurately perceive when I am thirsty",
    "I can always accurately perceive when I need to urinate",
    "I can always accurately perceive when I need to defecate",
    "I can always accurately perceive when I encounter different tastes",
    "I can always accurately perceive when I am about to blink", // Attentional check
    "I can always accurately perceive when I am going to vomit",
    "I can always accurately perceive when I am going to sneeze",
    "I can always accurately perceive when I am going to cough",
    "I can always accurately perceive when I am hot/cold",
    "I can always accurately perceive when I am sexually aroused",
    "I can always accurately perceive when I am going to pass wind",
    "I can always accurately perceive when I am going to burp",
    "I can always accurately perceive when my muscles are tired/sore",
    "I can always accurately perceive when I am going to get a bruise",
    "I can always accurately perceive when I am in pain",
    "I can always accurately perceive when my blood sugar is low",
    "I can always accurately perceive when someone is touching me affectionately rather than non-affectionately",
    "I can always accurately perceive when something is going to be ticklish",
    "I can always accurately perceive when something is going to be itchy",
]
var IAS_dimensions = [
    "IAS_1",
    "IAS_2",
    "IAS_3",
    "IAS_4",
    "IAS_5",
    "IAS_6",
    "IAS_7",
    "AttentionCheck_1",
    "IAS_8",
    "IAS_9",
    "IAS_10",
    "IAS_11",
    "IAS_12",
    "IAS_13",
    "IAS_14",
    "IAS_15",
    "IAS_16",
    "IAS_17",
    "IAS_18",
    "IAS_19",
    "IAS_20",
    "IAS_21",
]

var ias_questions = []
for (const [index, element] of IAS_items.entries()) {
    ias_questions.push({
        prompt: "<b>" + element + "</b>",
        name: IAS_dimensions[index],
        ticks: ["Strongly Disagree", "Strongly Agree"],
        required: true,
        min: 0,
        max: 1,
        step: 0.01,
        slider_start: 0.5,
    })
}

var ias = {
    type: jsPsychMultipleSlider,
    questions: ias_questions,
    randomize_question_order: true,
    preamble:
        "<h2>About your body sensations...</h2>" +
        "<p style='text-align: left;'>Below are several statements regarding how accurately you can perceive specific bodily sensations. Please rate on the scale how well you believe you can perceive each specific signal.</p>" +
        "<p style='text-align: left;'>For example, if you often feel you need to urinate and then realise you do not need to when you go to the toilet, you would rate your accuracy perceiving this bodily signal as low.</p>" +
        "<p style='text-align: left;'>Please only rate how well you can perceive these signals without using external cues. For example, if you can only perceive how fast your heart is beating when you measure it by taking your pulse, this would <i>not</i> count as accurate internal perception.</p><br /><br/> ",
    require_movement: false,
    slider_width: 700,
    data: {
        screen: "questionnaire_ias",
    },
}

// BDI-II ========================================================================
var bdi2 = {
    type: jsPsychSurveyMultiChoice,
    css_classes: ["narrow-text"],
    preamble:
        "<p style='text-align: left;'>This questionnaire consists of 21 groups of statements. Please read each group of statements carefully. And then pick out the one statement in each group that best describes the way you have been feeling <b>during the past two weeks</b>, including today. If several statements in the group seem to apply equally well, circle the highest number for that group.</p>",
    questions: [
        {
            prompt: "<b>1. Sadness</b>",
            options: [
                "0. I do not feel sad",
                "1. I feel sad much of the time",
                "2. I am sad all the time",
                "3. I am so sad or unhappy that I can't stand it",
            ],
            name: "BDI2_1",
            required: true,
        },
        {
            prompt: "<b>2. Pessimism</b>",
            options: [
                "0. I am not discouraged about my future",
                "1. I feel more discouraged about my future than I used to",
                "2. I do not expect things to work out for me",
                "3. I feel my future is hopeless and will only get worse",
            ],
            name: "BDI2_2",
            required: true,
        },
        {
            prompt: "<b>3. Past Failure</b>",
            options: [
                "0. I do not feel like a failure",
                "1. I have failed more than I should have",
                "2. As I look back, I see a lot of failures",
                "3. I feel I am a total failure as a person",
            ],
            name: "BDI2_3",
            required: true,
        },
        {
            prompt: "<b>4. Loss of Pleasure</b>",
            options: [
                "0. I get as much pleasure as I ever did from the things I enjoy",
                "1. I don't enjoy things as much as I used to",
                "2. I get very little pleasure from the things I used to enjoy",
                "3. I can't get any pleasure from the things I used to enjoy",
            ],
            name: "BDI2_4",
            required: true,
        },
        {
            prompt: "<b>5. Guilty Feelings</b>",
            options: [
                "0. I don't feel particularly guilty",
                "1. I feel guilty over many things I have done or should have done",
                "2. I feel quite guilty most of the time",
                "3. I feel guilty all of the time",
            ],
            name: "BDI2_5",
            required: true,
        },
        {
            prompt: "<b>6. Punishment Feelings</b>",
            options: [
                "0. I don't feel I am being punished",
                "1. I feel I may be punished",
                "2. I expect to be punished",
                "3. I feel I am being punished",
            ],
            name: "BDI2_6",
            required: true,
        },
        {
            prompt: "<b>7. Self-Dislike</b>",
            options: [
                "0. I feel the same about myself as ever",
                "1. I have lost confidence in myself",
                "2. I am disappointed in myself",
                "3. I dislike myself",
            ],
            name: "BDI2_7",
            required: true,
        },
        {
            prompt: "<b>8. Self-Criticalness</b>",
            options: [
                "0. I don't criticize or blame myself more than usual",
                "1. I am more critical of myself than I used to be",
                "2. I criticize myself for all of my faults",
                "3. I blame myself for everything bad that happens",
            ],
            name: "BDI2_8",
            required: true,
        },
        {
            prompt: "<b>9. Suicidal Thoughts or Wishes</b>",
            options: [
                "0. I don't have any thoughts of killing myself",
                "1. I have thoughts of killing myself, but I would not carry them out",
                "2. I would like to kill myself",
                "3. I would kill myself if I had the chance",
            ],
            name: "BDI2_9",
            required: true,
        },
        {
            prompt: "<b>10. Crying</b>",
            options: [
                "0. I don't cry anymore than I used to",
                "1. I cry more than I used to",
                "2. I cry over every little thing",
                "3. I feel like crying, but I can't",
            ],
            name: "BDI2_10",
            required: true,
        },
        {
            prompt: "<b>11. Agitation</b>",
            options: [
                "0. I am no more restless or wound up than usual",
                "1. I feel more restless or wound up than usual",
                "2. I am so restless or agitated, it's hard to stay still",
                "3. I am so restless or agitated that I have to keep moving or doing something",
            ],
            name: "BDI2_11",
            required: true,
        },
        {
            prompt: "<b>12. Loss of Interest</b>",
            options: [
                "0. I have not lost interest in other people or activities",
                "1. I am less interested in other people or things than before",
                "2. I have lost most of my interest in other people or things",
                "3. It's hard to get interested in anything",
            ],
            name: "BDI2_12",
            required: true,
        },
        {
            prompt: "<b>13. Indecisiveness</b>",
            options: [
                "0. I make decisions about as well as ever",
                "1. I find it more difficult to make decisions than usual",
                "2. I have much greater difficulty in making decisions than I used to",
                "3. I have trouble making any decisions",
            ],
            name: "BDI2_13",
            required: true,
        },
        {
            prompt: "<b>14. Worthlessness</b>",
            options: [
                "0. I do not feel I am worthless",
                "1. I don't consider myself as worthwhile and useful as I used to",
                "2. I feel more worthless as compared to others",
                "3. I feel utterly worthless",
            ],
            name: "BDI2_14",
            required: true,
        },
        {
            prompt: "<b>15. Loss of Energy</b>",
            options: [
                "0. I have as much energy as ever",
                "1. I have less energy than I used to have",
                "2. I don't have enough energy to do very much",
                "3. I don't have enough energy to do anything",
            ],
            name: "BDI2_15",
            required: true,
        },
        {
            prompt: "<b>16. Changes in Sleeping Pattern</b>",
            options: [
                "0. I have not experienced any change in my sleeping pattern",
                "1a. I sleep somewhat more than usual",
                "1b. I sleep somewhat less than usual",
                "2a. I sleep a lot more than usual",
                "2b. I sleep a lot less than usual",
                "3a. I sleep most of the day",
                "3b. I wake up 1-2 hours early and can't get back to sleep",
            ],
            name: "BDI2_16",
            required: true,
        },
        {
            prompt: "<b>17. Irritability</b>",
            options: [
                "0. I am not more irritable than usual",
                "1. I am more irritable than usual",
                "2. I am much more irritable than usual",
                "3. I am irritable all the time",
            ],
            name: "BDI2_17",
            required: true,
        },
        {
            prompt: "<b>18. Changes in Appetite</b>",
            options: [
                "0. I have not experienced any change in my appetite",
                "1a. My appetite is somewhat less than usual",
                "1b. My appetite is somewhat greater than usual",
                "2a. My appetite is much less than before",
                "2b. My appetite is much greater than usual",
                "3a. I have no appetite at all",
                "3b. I crave food all the time",
            ],
            name: "BDI2_18",
            required: true,
        },
        {
            prompt: "<b>19. Attention</b>", // Attention check
            options: [
                "0. I am not paying attention",
                "1. I am cyrrebtky answering the questions at random",
                "2. I am carefuly reading and answering the questions",
                "3. I am not reading to try finish the questionnaire quickly",
            ],
            name: "AttentionCheck_2",
            required: true,
        },
        {
            prompt: "<b>19. Concentration Difficulty</b>",
            options: [
                "0. I can concentrate as well as ever",
                "1. I can't concentrate as well as usual",
                "2. It's hard to keep my mind on anything for very long",
                "3. I find I can't concentrate on anything",
            ],
            name: "BDI2_19",
            required: true,
        },
        {
            prompt: "<b>20. Tiredness or Fatigue</b>",
            options: [
                "0. I am no more tired or fatigued than usual",
                "1. I get more tired or fatigued more easily than usual",
                "2. I am too tired or fatigued to do a lot of the things I used to do",
                "3. I am too tired or fatigued to do most of the things I used to do",
            ],
            name: "BDI2_20",
            required: true,
        },
        {
            prompt: "<b>21. Loss of Interest in Sex</b>",
            options: [
                "0. I have not noticed any recent change in my interest in sex",
                "1. I am less interested in sex than I used to be",
                "2. I am much less interested in sex now",
                "3. I have lost interest in sex completely",
            ],
            name: "BDI2_21",
            required: true,
        },
    ],
    data: {
        screen: "questionnaire_bdi2",
    },
}

// MAIA-2 questionnaire
var MAIA_items = [
    "When I am tense I notice where the tension is located in my body",
    "I notice when I am uncomfortable in my body",
    "I notice where in my body I am comfortable",
    "I notice changes in my breathing, such as whether it slows down or speeds up",
    "I ignore physical tension or discomfort until they become more severe",
    "I distract myself from sensations of discomfort",
    "When I feel pain or discomfort, I try to power through it",
    "I try to ignore pain",
    "I push feelings of discomfort away by focusing on something",
    "When I feel unpleasant body sensations, I occupy myself with something else so I do not have to feel them",
    "When I feel physical pain, I become upset",
    "I start to worry that something is wrong if I feel any discomfort",
    "I can notice an unpleasant body sensation without worrying about it",
    "I can stay calm and not worry when I have feelings of discomfort or pain",
    "When I am in discomfort or pain I cannot get it out of my mind",
    "I can pay attention to my breath without being distracted by things happening around me",
    "I can maintain awareness of my inner bodily sensations even when there is a lot going on around me",
    "When I am in conversation with someone, I can pay attention to my posture",
    "I can return awareness to my body if I am distracted",
    "I can refocus my attention from thinking to sensing my body",
    "I can maintain awareness of my whole body even when a part of me is in pain or discomfort",
    "I am able to consciously focus on my body as a whole",
    "I notice how my body changes when I am angry",
    "When something is wrong in my life I can feel it in my body",
    "I notice that my body feels different after a peaceful experience",
    "I notice that my breathing becomes free and easy when I feel comfortable",
    "I notice how my body changes when I feel happy / joyful",
    "When I feel overwhelmed I can find a calm place inside",
    "When I bring awareness to my body I feel a sense of calm",
    "I can use my breath to reduce tension",
    "When I am caught up in thoughts, I can calm my mind by focusing on my body/breathing",
    "I listen for information from my body about my emotional state",
    "When I am upset, I take time to explore how my body feels",
    "I listen to my body to inform me about what to do",
    "I am at home in my body",
    "I feel my body is a safe place",
    "I trust my body sensations",
    "I answer to the right end of the scale to show that I am paying attention", // Attentional Check
]
var MAIA_dimensions = [
    "MAIA2_Noticing_1",
    "MAIA2_Noticing_2",
    "MAIA2_Noticing_3",
    "MAIA2_Noticing_4",
    "MAIA2_NotDistracting_1_R",
    "MAIA2_NotDistracting_2_R",
    "MAIA2_NotDistracting_3_R",
    "MAIA2_NotDistracting_4_R",
    "MAIA2_NotDistracting_5_R",
    "MAIA2_NotDistracting_6_R",
    "MAIA2_NotWorrying_1_R",
    "MAIA2_NotWorrying_2_R",
    "MAIA2_NotWorrying_3",
    "MAIA2_NotWorrying_4",
    "MAIA2_NotWorrying_5_R",
    "MAIA2_AttentionRegulation_1",
    "MAIA2_AttentionRegulation_2",
    "MAIA2_AttentionRegulation_3",
    "MAIA2_AttentionRegulation_4",
    "MAIA2_AttentionRegulation_5",
    "MAIA2_AttentionRegulation_6",
    "MAIA2_AttentionRegulation_7",
    "MAIA2_EmotionalAwareness_1",
    "MAIA2_EmotionalAwareness_2",
    "MAIA2_EmotionalAwareness_3",
    "MAIA2_EmotionalAwareness_4",
    "MAIA2_EmotionalAwareness_5",
    "MAIA2_SelfRegulation_1",
    "MAIA2_SelfRegulation_2",
    "MAIA2_SelfRegulation_3",
    "MAIA2_SelfRegulation_4",
    "MAIA2_BodyListening_1",
    "MAIA2_BodyListening_2",
    "MAIA2_BodyListening_3",
    "MAIA2_Trusting_1",
    "MAIA2_Trusting_2",
    "MAIA2_Trusting_3",
    "AttentionCheck_3",
]

// MAIA-2 Questions
var maia2_questions = []
for (const [index, element] of MAIA_items.entries()) {
    maia2_questions.push({
        prompt: "<b>" + element + "</b>",
        name: MAIA_dimensions[index],
        ticks: ["Never", "Always"],
        required: false,
        min: 0,
        max: 1,
        step: 0.01,
        slider_start: 0.5,
    })
}

var maia = {
    type: jsPsychMultipleSlider,
    questions: maia2_questions,
    randomize_question_order: true,
    preamble:
        "<h2>About your body sensations...</h2>" +
        "<p>Please indicate how often each statement applies to you generally in daily life.</p><br /><br/> ",
    require_movement: false,
    slider_width: null,
    data: {
        screen: "questionnaire_maia",
    },
}
