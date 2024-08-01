import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div>
      <footer className="bg-gray-800 text-white">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
              <h3 className="text-sm font-bold">{t('Internship by places')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('New York')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Los Angeles')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Chicago')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('San Francisco')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Miami')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Seattle')}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">{t('Internship by stream')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('About us')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Careers')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Press')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('News')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Media kit')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Contact')}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">{t('Job Places')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Blog')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Newsletter')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Events')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Help center')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Tutorials')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Supports')}</a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">{t('Jobs by streams')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Startups')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Government')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Saas')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Marketplaces')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Ecommerce')}</a>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 md:my-10" />
          <div>
            <h3 className="text-sm font-bold">{t('About us')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Startups')}</a>
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">{t('Team diary')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Startups')}</a>
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">{t('Terms and conditions')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Startups')}</a>
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">{t('sitemap')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('Startups')}</a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="border-white">
              <i className="bi bi-google-play text-black"></i> {t('Get Android App')}
            </p>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
            <p className="mt-4 text-sm sm:mt-0">© {t('Copyright')} 2023. {t('All Rights Reserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
