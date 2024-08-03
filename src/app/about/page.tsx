import React from 'react'
import styles from './aboutPage.module.css'

const About = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Hello, dear reader!</h2>

            <p>
                I'm Ilia Nekrasov, a passionate Fullstack Developer with over five years of hands-on experience in crafting web solutions. My journey in the tech world began with a strong educational foundation, earning a Master's Degree in Applied Math and Computer Science from Tyumen State Industrial University in Russia. Seeking new challenges and opportunities, I moved to Israel and further honed my skills through a specialized Java & Web Developer program at Tel-Ran Computing Solution Ltd.
            </p>
            <p>
                My professional career kicked off in Russia, where I worked as a Frontend Web Developer at Business Promotion. There, I maintained and developed Instagram-related web applications, transforming legacy codebases with modern technologies. This role ignited my love for frontend development and set the stage for my future endeavors.
            </p>
            <p>
                In 2019, I joined Optisor LTD in Rehovot, Israel, as a Frontend Web Developer. I delved into creating dynamic web applications, including SPAs and online shops, while mastering the full project lifecycle—from inception to deployment and maintenance. My work here involved SEO optimization, backend data synchronization, and the integration of various services like payment systems, analytics, and social media.
            </p>
            <p>
                Currently, I am a Fullstack Web Developer at Gini-apps LTD in Herzliya, Israel. At Gini-apps, I develop SDK web components using vanilla JavaScript and build robust SPAs with React 18 and TypeScript. I've had the opportunity to work on audio/video applications and integrate essential services like mParticle, Braze, Twilio, and MailChimp.
            </p>
            <p>
                Throughout my career, I've embraced a diverse tech stack, including ReactJS, Next.js, TypeScript, Node.js, and various databases like PostgreSQL, MySQL, and MongoDB. I thrive in environments that utilize CI/CD practices with tools like CircleCI and GitHub Actions and enjoy exploring new frameworks and libraries to enhance my development process.
            </p>
            <p>
                When I'm not coding, I enjoy exploring new technologies and keeping up with industry trends. As I plan my move to the center of Israel this fall, I'm excited about the new opportunities and challenges that lie ahead.
            </p>
            <p>
                31-07-2024
            </p>

            <h2 className={styles.title}>About the idea</h2>
            <p>
                This blog initially started as a simple addition to my portfolio. However, one day in the shower (where all the best ideas seem to come to mind), I realized I wanted to create something truly useful, at least for myself.
            </p>
            <p>
                That's when the idea struck to transform this blog into a dynamic cheat sheet, one that could always be expanded and updated. There was a significant amount of work ahead. But if you're reading this, it means I completed the task.
            </p>
            <p>
                03-08-2024
            </p>
        </div>
    )
}

export default About;