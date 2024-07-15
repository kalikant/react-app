// src/pages/Documentation.js
import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { styled } from '@mui/system';
import usePrismHighlight from '../hooks/usePrismHighlight';

const documentationTopics = [
  {
    id: '1',
    title: 'Introduction',
    content: `
      # Introduction

      Welcome to the documentation! This is the introduction content.
    `,
  },
  {
    id: '2',
    title: 'Installation',
    content: `
      # Installation

      This is the installation content.
      
      \`\`\`bash
      npm install your-library
      \`\`\`
    `,
  },
  {
    id: '3',
    title: 'Usage',
    content: `
      # Usage

      This is the usage content.
      
      \`\`\`javascript
      console.log("Hello, world!");
      \`\`\`
    `,
  },
  {
    id: '4',
    title: 'API Reference',
    content: `
      # API Reference

      This is the API reference content.
    `,
  },
  {
    id: '5',
    title: 'Examples',
    content: `
      # Examples

      This is the examples content.
    `,
  },
  // Add more topics as needed
];

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  '& .MuiTreeItem-label': {
    fontSize: '1rem',
  },
}));

const Documentation = () => {
  usePrismHighlight();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(documentationTopics[0]);

  const filteredTopics = documentationTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTopicSelect = (event, nodeId) => {
    const topic = documentationTopics.find(topic => topic.id === nodeId);
    setSelectedTopic(topic);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Paper elevation={10} sx={{ padding: 4, width: '90%', display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TreeView
              defaultCollapseIcon={<SearchIcon />}
              defaultExpandIcon={<SearchIcon />}
              onNodeSelect={handleTopicSelect}
            >
              {filteredTopics.map((topic) => (
                <StyledTreeItem key={topic.id} nodeId={topic.id} label={topic.title} />
              ))}
            </TreeView>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {selectedTopic.title}
            </Typography>
            <div
              dangerouslySetInnerHTML={{ __html: selectedTopic.content }}
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Documentation;
