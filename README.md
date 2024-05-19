## Inspiration
Schooling is expensive. The average private preschool tuition in California is $12,967 per year—a hefty cost not every parent can front. However, a preschool education greatly sets up children to success in elementary school, snowballing to success later on in their academic careers. How can we empower the children of these parents to take these crucial first steps in their educational future?

Music is also shown to enhance recall and enhances brain development in young children. That got us thinking: Is there a way to teach children the knowledge they miss in preschool through song and dance?

## What it Does
ABSeas is a web application aimed to teach children about core topics in preschool. These include things like: counting, letters, sharing, and manners. To enhance engagement, we opted to deliver these key topics through music, allowing kids to sing along, as well as adding fun pictures relating to the song to visually solidify the connection between music and ideas.

## Crafting use case flows
To help make learning accessible and enjoyable for every child, we focused on three key areas:

**Content Synchronization**: We've blended essential preschool concepts with catchy songs and engaging visuals, turning a click into a leap towards fun and immersive learning.

**Intuitive Interaction**: Designed for simplicity, our platform allows kids to easily explore and learn through bold visuals and interactive elements, tapping into their natural curiosity.

**Progressive Learning**: Our content is capable of growing with the learner, starting with basics like the ABCs and advancing to more complex topics like social skills at the learner's request

Our approach emphasizes ease of use, engaging content, and adaptability, making learning a delightful journey for all children.
![Use Case Flow 1](https://github.com/IdkwhatImD0ing/ABSeas/assets/41877651/0c5db584-7f3c-4739-a82a-d71b4212de47)

## Design Process
When designing ABSeas, we aimed for simplicity in learning and integrated preschool knowledge with engaging music and visuals. Our interface is designed with bold colors and large, interactive elements, making it easy for young learners to navigate on tablets or for parents to help on desktops. We've transformed essential preschool concepts into catchy songs and colorful visuals that grab attention and aid memory.
![Design Process 1](https://github.com/IdkwhatImD0ing/ABSeas/assets/41877651/1af4d369-c219-43c1-b5b1-dc61a9e6a30d)

ABSeas offers a personalized learning experience. It subtly guides users—both kids and parents—through its modules, ensuring a smooth flow of content. This approach helps avoid overwhelming choices, making each interaction with ABSeas feel tailored and effortlessly educational, yet natural and fun.

![Design Process 2](https://github.com/IdkwhatImD0ing/ABSeas/assets/41877651/adf33887-713a-4ce7-914d-630d64d6e3a8)

## How we built it (Technical)
**Frontend**
We utilized the current standard tech stack in web development.
![Frontend Tech Stack](https://github.com/IdkwhatImD0ing/ABSeas/assets/41877651/a748b68c-58cb-400f-999d-8fbe1a8d0957)

**Backend**
Our backend pipeline utilizes cutting edge artificial intelligence technologies. 
![Backend Tech Stack](https://github.com/IdkwhatImD0ing/ABSeas/assets/41877651/6d19074e-036f-4285-8adf-aeb61216a621)

These include:
- Anthropic Claude, a competitor to ChatGPT boasting better written and more creative responses
- Suno AI, the latest and greatest in AI-generated songs and music
- OpenAI’s Dalle 3
- Eleven Labs, one of the leaders in voice cloning and text-to-speech
- Open AI Whisper

Our song creation pipeline is shown below:
![Pipeline](https://github.com/IdkwhatImD0ing/ABSeas/assets/41877651/e6895802-b1c0-4b75-b624-1e16586c5117)

## Challenges we ran into
Integrating Firebase and various APIs posed a key challenge in our project, requiring tight coordination between frontend interactivity and backend stability. We had to ensure Firebase's real-time database synced flawlessly with many synchronous API calls.

## Accomplishments that we're proud of
We’re excited about infusing our product with generative AI, giving a modern twist to learning with visuals and music, just like the ABCs did for us. It feels great to build something innovative with the potential to really make a difference.

## What we learned
We learned how to multiprocess, process audio, refine frontend styling, and improve user interaction flow while delivering a professional and intuitive user experience.

## Sources
* https://www.privateschoolreview.com/tuition-stats/california/pre
* https://ced.ncsu.edu/news/2021/05/21/ask-the-expert-why-is-a-preschool-education-important-when-children-attend-high-quality-pre-k-programs-they-get-a-really-great-boost-in-early-skills-that-set-them-up-for-success-in-element/
* https://extension.psu.edu/programs/betterkidcare/news/music-makes-it-memorable
* https://today.usc.edu/childrens-brains-develop-faster-with-music-training/
