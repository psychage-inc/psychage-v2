import React from 'react';
import { Link } from 'react-router-dom';
import type { Author } from '@/types/models';
import { getAuthorById } from '@/data/authors';

interface AuthorLinkProps {
  author?: Author;
  className?: string;
}

const AuthorLink: React.FC<AuthorLinkProps> = ({ author, className }) => {
  const name = author?.name || 'Psychage Editorial';
  const profile = author ? getAuthorById(author.id) : undefined;

  if (!profile?.slug) {
    return <span className={className}>{name}</span>;
  }

  return (
    <Link
      to={`/authors/${profile.slug}`}
      className={`hover:text-primary transition-colors ${className || ''}`}
    >
      {name}
    </Link>
  );
};

export default AuthorLink;
