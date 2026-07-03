import React from 'react';
import { notFound } from 'next/navigation';
import { roles } from '@/data/roles';
import RoleDetail from '@/components/templates/RoleDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for each leadership role slug
export async function generateStaticParams() {
  return roles.map((role) => ({
    slug: role.slug,
  }));
}

export default async function LeadershipPage({ params }: PageProps) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);

  if (!role) {
    notFound();
  }

  return <RoleDetail role={role} />;
}
