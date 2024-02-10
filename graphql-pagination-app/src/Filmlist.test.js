import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilmList from './Components/FilmList/Filmlist';
import { MockedProvider } from '@apollo/client/testing';
import { Get_Films } from './Queries';

const mocks = [
  
  {
    request: {
      query: Get_Films,
    },
    result: {
      data: {
        allFilms: {
          films: [
            
            {
              title: 'Film 1',
              director: 'Director 1',
              releaseDate: '2022-01-01',
              speciesConnection: {
                species: [
                  {
                    name: 'Species 1',
                    classification: 'Classification 1',
                    homeworld: {
                      name: 'Homeworld 1',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
];

describe('FilmList Component', () => {
    it('renders loading state and then films', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FilmList />
            </MockedProvider>
        );
    
        
        await waitFor(() => expect(screen.getByText('Film 1')).toBeInTheDocument());
    });
    

    it('handles next and previous page clicks', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FilmList />
            </MockedProvider>
        );
    
        // Wait for films to be loaded
        await waitFor(() => expect(screen.getByText('Film 1')).toBeInTheDocument());
    
        // Click on the "Next" button
        fireEvent.click(screen.getByText('Next'));
    
        // Wait for the page number to be updated
        await waitFor(() => expect(screen.getByText('Page 2')).toBeInTheDocument(), { timeout: 3000 });
    
        // Click on the "Previous" button
        fireEvent.click(screen.getByText('Previous'));
    
        // Wait for the page number to be updated back to 1
        await waitFor(() => expect(screen.getByText('Page 1')).toBeInTheDocument(), { timeout: 3000 });
    });
    
    

    it('displays loading spinner', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FilmList />
            </MockedProvider>
        );
    
        // Ensure loading spinner is displayed
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    
        // Wait for films to be loaded
        await waitFor(() => expect(screen.getByText('Film 1')).toBeInTheDocument());
    });

    it('displays error message', async () => {
        const errorMocks = [
            {
                request: {
                    query: Get_Films,
                },
                error: new Error('GraphQL Error'),
            },
        ];
    
        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <FilmList />
            </MockedProvider>
        );
    
        // Wait for error message to be displayed
        await waitFor(() => expect(screen.getByText('GraphQL Error: GraphQL Error')).toBeInTheDocument());
    });

    it('filters films based on search query', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FilmList searchQuery="Film 1" />
            </MockedProvider>
        );
    
        // Wait for films to be loaded
        await waitFor(() => expect(screen.getByText('Film 1')).toBeInTheDocument());
    
        // Ensure only the filtered film is displayed
        expect(screen.getByText('Film 1')).toBeInTheDocument();
        expect(screen.queryByText('Film 2')).toBeNull();
    });
    


  afterEach(() => {
    jest.clearAllMocks();
  });
});
