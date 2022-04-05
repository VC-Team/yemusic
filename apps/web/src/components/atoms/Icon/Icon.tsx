import React, { FC } from 'react';

import classNames from 'classnames';

import './style.scss';

export interface IconProps {
  color?: 'inherit' | 'secondary' | 'primary';
}

export const HomeIcon: FC<IconProps> = ({ color = 'secondary' }) => (
  <svg className={classNames('a-icon', `-${color}`)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.40171 22.5675H17.6017C19.3917 22.5675 21.0817 21.1375 21.3817 19.3675L22.7117 11.4076C22.9117 10.1676 22.3117 8.57756 21.3317 7.78756L14.4017 2.24752C13.0517 1.16752 10.9417 1.15751 9.60172 2.23751L2.67171 7.78756C1.68171 8.57756 1.08171 10.1676 1.29171 11.4076L2.62171 19.3675C2.92171 21.1675 4.58171 22.5675 6.40171 22.5675ZM10.5417 3.4175C10.9317 3.1075 11.4617 2.94753 11.9917 2.94753C12.5317 2.94753 13.0617 3.1075 13.4617 3.4175L20.3917 8.95754C20.9517 9.40754 21.3517 10.4376 21.2317 11.1576L19.9017 19.1175C19.7217 20.1775 18.6717 21.0675 17.6017 21.0675H6.40171C5.33171 21.0675 4.28172 20.1775 4.10172 19.1275L2.77172 11.1675C2.65172 10.4475 3.04171 9.42755 3.61171 8.96755L10.5417 3.4175ZM8.75 13C8.75 14.79 10.21 16.25 12 16.25C13.79 16.25 15.25 14.79 15.25 13C15.25 11.21 13.79 9.75001 12 9.75001C10.21 9.75001 8.75 11.21 8.75 13ZM10.25 13C10.25 12.04 11.04 11.25 12 11.25C12.96 11.25 13.75 12.04 13.75 13C13.75 13.96 12.96 14.75 12 14.75C11.04 14.75 10.25 13.96 10.25 13Z"
    />
  </svg>
);

export const HomeActiveIcon: FC<IconProps> = ({ color = 'secondary' }) => (
  <svg className={classNames('a-icon', `-${color}`)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.8617 8.37313L13.9317 2.83313C12.8617 1.97313 11.1317 1.97313 10.0717 2.82313L3.14168 8.37313C2.36168 8.99313 1.86168 10.3031 2.03168 11.2831L3.36168 19.2431C3.60168 20.6631 4.96168 21.8131 6.40168 21.8131H17.6017C19.0317 21.8131 20.4017 20.6531 20.6417 19.2431L21.9717 11.2831C22.1317 10.3031 21.6317 8.99313 20.8617 8.37313ZM12.0017 15.5031C10.6217 15.5031 9.50168 14.3831 9.50168 13.0031C9.50168 11.6231 10.6217 10.5031 12.0017 10.5031C13.3817 10.5031 14.5017 11.6231 14.5017 13.0031C14.5017 14.3831 13.3817 15.5031 12.0017 15.5031Z" />
  </svg>
);
