import React from 'react';
import Navbar from '../components/global/Navbar';
import { PinContainer } from '../components/ui/3dPin';
import { CardContainer, CardBody, CardItem } from '../components/ui/InfiniteMovingCards';
import { IconCheck } from '@tabler/icons-react';
import { GridBackgroundDemo } from '../components/ui/GridBackground';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const cardsData = [
    {
      index: 1,
      title: 'Question Paper Generator',
      features: [
        'Customizable templates',
        'Subject-wise question selection',
        'Automated grading system',
      ],
      buttonPrimary: 'Generate Now',
      buttonSecondary: 'Learn More',
    },
    {
      index: 2,
      title: 'Interview Preparation',
      features: [
        'Mock interviews with experts',
        'Feedback and improvement tips',
        'Access to a library of questions',
      ],
      buttonPrimary: 'Start Preparation',
      buttonSecondary: 'View Resources',
    },
    {
      index: 3,
      title: 'Practice Tests',
      features: [
        'Timed quizzes',
        'Performance analytics',
        'Topic-wise breakdown',
      ],
      buttonPrimary: 'Take a Test',
      buttonSecondary: 'See Results',
    },
    {
      index: 4,
      title: 'Study Material',
      features: [
        'Curated resources for various subjects',
        'Downloadable PDFs and videos',
        'Regular updates on new content',
      ],
      buttonPrimary: 'Access Materials',
      buttonSecondary: 'Explore More',
    },
    {
      index: 5,
      title: 'Feedback & Analysis',
      features: [
        'Detailed performance reports',
        'Identify strengths and weaknesses',
        'Personalized study plans',
      ],
      buttonPrimary: 'Get Feedback',
      buttonSecondary: 'Analyze Performance',
    },
    {
      index: 6,
      title: 'Community Support',
      features: [
        'Join study groups',
        'Discussion forums',
        'Connect with peers and mentors',
      ],
      buttonPrimary: 'Join Now',
      buttonSecondary: 'Community Forum',
    },
  ];

  // Function to generate route paths based on card title (or index if preferred)
  const generateRoutePath = (title) => {
    return `/${title.toLowerCase().replace(/\s+/g, '-')}`; // Convert title to URL-friendly path
  };

  return (
    <div>
      <Navbar />
      <GridBackgroundDemo>
        <div className="px-4 md:px-12 lg:px-24 py-8">
          <h1 className="text-2xl font-semibold mb-6 text-neutral-600 dark:text-white">Welcome to Your Dashboard!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted gap */}
            {cardsData.map((card, index) => (
              <Link to={generateRoutePath(card.title)} key={index} className="w-full"> {/* Wrap entire card in Link */}
                <CardContainer>
                  <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:w-[400px] h-auto rounded-xl p-8 border transition-shadow duration-300">
                    <CardItem
                      translateZ={"50"}
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      {card.title}
                    </CardItem>
                    <CardItem
                      translateZ={"60"}
                      className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                      <ul className="my-4 flex flex-col gap-2">
                        {card.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <IconCheck /> {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center mt-8">
                        <CardItem
                          translateZ={20}
                          as={"button"}
                          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white border border-neutral-600"
                        >
                          {card.buttonPrimary} {"->"}
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          as={"button"}
                          className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        >
                          {card.buttonSecondary}
                        </CardItem>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </Link>
            ))}
          </div>
        </div>
      </GridBackgroundDemo>
    </div>
  );
};

export default Dashboard;
