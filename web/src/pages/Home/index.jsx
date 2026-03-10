/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@douyinfe/semi-ui';
import { IconPlay } from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { API, getOAuthProviderIcon } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { useActualTheme } from '../../context/Theme';
import NoticeModal from '../../components/layout/NoticeModal';

const { Text } = Typography;

const DISCORD_INVITE_URL = 'https://discord.gg/z7RrQCz2Gx';
const HERO_CAT_IMAGE = '';

const HOME_COPY = {
  'zh-CN': {
    loading: '首页加载中...',
    eyebrow: '统一 AI 工作台',
    title: '把入口留在中间，把复杂留在后面。',
    subtitle: '先进入控制台，或直接加入 Discord。首页只保留最必要的两步。',
    console: '控制台',
    discord: 'DISCORD',
    catPlaceholder: '猫咪主视觉预留区',
  },
  'zh-TW': {
    loading: '首頁載入中...',
    eyebrow: '統一 AI 工作台',
    title: '把入口留在中間，把複雜留在後面。',
    subtitle: '先進入控制檯，或直接加入 Discord。首頁只保留最必要的兩步。',
    console: '控制檯',
    discord: 'DISCORD',
    catPlaceholder: '貓咪主視覺預留區',
  },
  en: {
    loading: 'Loading homepage...',
    eyebrow: 'Unified AI workspace',
    title: 'Keep the entrypoint centered. Leave the complexity behind it.',
    subtitle:
      'Open the control panel or join Discord from a quieter first screen.',
    console: 'Control Panel',
    discord: 'DISCORD',
    catPlaceholder: 'Cat image placeholder',
  },
};

const getLocaleKey = (language = '') => {
  if (language.startsWith('zh-TW')) return 'zh-TW';
  if (language.startsWith('en')) return 'en';
  return 'zh-CN';
};

const Home = () => {
  const { i18n } = useTranslation();
  const actualTheme = useActualTheme();
  const isMobile = useIsMobile();
  const copy = HOME_COPY[getLocaleKey(i18n.language)];

  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);

  const displayHomePageContent = async () => {
    try {
      setHomePageContent(localStorage.getItem('home_page_content') || '');
      const res = await API.get('/api/home_page_content');
      const { success, data } = res.data;
      if (!success) {
        setHomePageContent('');
        return;
      }

      const sourceContent = typeof data === 'string' ? data : '';
      const renderedContent = sourceContent.startsWith('https://')
        ? sourceContent
        : marked.parse(sourceContent);
      setHomePageContent(renderedContent);
      localStorage.setItem('home_page_content', renderedContent);
    } catch (error) {
      setHomePageContent('');
    } finally {
      setHomePageContentLoaded(true);
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate === today) return;

      try {
        const res = await API.get('/api/notice');
        const { success, data } = res.data;
        if (success && data && data.trim() !== '') {
          setNoticeVisible(true);
        }
      } catch (error) {
        console.error('Failed to load notice:', error);
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().catch(console.error);
  }, []);

  useEffect(() => {
    if (!homePageContent.startsWith('https://')) return;
    const iframe = document.querySelector('iframe');
    if (!iframe) return;
    iframe.onload = () => {
      iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
      iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
    };
  }, [actualTheme, homePageContent, i18n.language]);

  const shouldShowDefaultHome = homePageContentLoaded && homePageContent === '';
  const shouldShowCustomHome = homePageContentLoaded && homePageContent !== '';

  const openDiscord = () => {
    window.open(DISCORD_INVITE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />

      {!homePageContentLoaded && (
        <div className='mt-[60px] min-h-[55vh] flex items-center justify-center px-4'>
          <Text type='tertiary'>{copy.loading}</Text>
        </div>
      )}

      {shouldShowDefaultHome && (
        <div className='home-claude-shell'>
          <section className='home-claude-hero mt-16'>
            <div className='home-claude-atmosphere' aria-hidden='true' />

            <div className='home-claude-stage'>
              <div className='home-claude-island'>
                <span className='home-claude-eyebrow'>{copy.eyebrow}</span>
                <h1 className='home-claude-title'>{copy.title}</h1>
                <p className='home-claude-subtitle'>{copy.subtitle}</p>

                <div className='home-claude-actions'>
                  <Link to='/console' className='home-claude-action-link'>
                    <Button
                      theme='solid'
                      type='primary'
                      size={isMobile ? 'default' : 'large'}
                      icon={<IconPlay />}
                      className='home-claude-btn-primary !rounded-2xl min-h-[44px] px-7 w-full sm:w-auto'
                    >
                      {copy.console}
                    </Button>
                  </Link>
                  <Button
                    size={isMobile ? 'default' : 'large'}
                    icon={getOAuthProviderIcon('discord', 18)}
                    className='home-claude-btn-secondary !rounded-2xl min-h-[44px] px-7 w-full sm:w-auto'
                    onClick={openDiscord}
                  >
                    {copy.discord}
                  </Button>
                </div>
              </div>

              <div className='home-claude-cat-wrap' aria-hidden='true'>
                {HERO_CAT_IMAGE ? (
                  <img
                    src={HERO_CAT_IMAGE}
                    alt=''
                    className='home-claude-cat-image'
                  />
                ) : (
                  <div className='home-claude-cat-placeholder'>
                    <div className='home-claude-cat-silhouette' />
                    <span className='home-claude-cat-label'>
                      {copy.catPlaceholder}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {shouldShowCustomHome && (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
              title='custom-home-page'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
