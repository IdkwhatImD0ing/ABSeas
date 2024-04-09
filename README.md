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
![Use Case Flow 1](https://cdn.discordapp.com/attachments/1220620651501453323/1226675733913665588/image.png?ex=6625a1cd&is=66132ccd&hm=875630e226bea72a4cf9f2c982433d49391b97edb208d86dc6e5651f92bc484d&=&format=webp&quality=lossless&width=1226&height=690)

## Design Process
When designing ABSeas, we aimed for simplicity in learning and integrated preschool knowledge with engaging music and visuals. Our interface is designed with bold colors and large, interactive elements, making it easy for young learners to navigate on tablets or for parents to help on desktops. We've transformed essential preschool concepts into catchy songs and colorful visuals that grab attention and aid memory.
![Design Process 1](https://cdn.discordapp.com/attachments/1220620651501453323/1226675081044820029/image.png?ex=6625a131&is=66132c31&hm=bd45855e99634536eefece75dcc21faff0ccc0ae9b2a44c9531b3494cf5580e4&=&format=webp&quality=lossless&width=1226&height=690)

ABSeas offers a personalized learning experience. It subtly guides users—both kids and parents—through its modules, ensuring a smooth flow of content. This approach helps avoid overwhelming choices, making each interaction with ABSeas feel tailored and effortlessly educational, yet natural and fun.

![Design Process 2](https://cdn.discordapp.com/attachments/1220620651501453323/1226673408817758238/image.png?ex=66259fa3&is=66132aa3&hm=f60b42737e0faccdc87f3295057d6cb493ae77651341f3a616ee67a29b569928&=&format=webp&quality=lossless&width=1226&height=690)

## How we built it (Technical)
**Frontend**
We utilized the current standard tech stack in web development.
![Frontend Tech Stack](https://media.discordapp.net/attachments/1220620651501453323/1226454805778796585/ABSeas.png?ex=6624d40c&is=66125f0c&hm=034cff420f32d150d1106c9659354db4408397d00ddafa7220a81467d9d5352b&=&format=webp&quality=lossless&width=1226&height=690)

**Backend**
Our backend pipeline utilizes cutting edge artificial intelligence technologies. 
![Backend Tech Stack](https://media.discordapp.net/attachments/1220620651501453323/1226556424960872489/image.png?ex=662532b0&is=6612bdb0&hm=8cae064a3b1118bdf75671d9c3d6a6f5e5ed393096c7ac9f04fd8edb82180d52&=&format=webp&quality=lossless&width=859&height=482)

These include:
- Anthropic Claude, a competitor to ChatGPT boasting better written and more creative responses
- Suno AI, the latest and greatest in AI-generated songs and music
- OpenAI’s Dalle 3
- Eleven Labs, one of the leaders in voice cloning and text-to-speech
- Open AI Whisper

Our song creation pipeline is shown below:
![Pipeline](https://media.discordapp.net/attachments/1220620651501453323/1226473021179691051/pipeline.png?ex=6624e503&is=66127003&hm=ddfcb3418ed26c5d3ba14037755f72eae5c15c84e2257b52c88400c6b67a076a&=&format=webp&quality=lossless&width=1226&height=689)

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