import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMeta = {
  slug: string;
  date: string;
  title: string;
  titleKo?: string;
  excerpt: string;
  excerptKo?: string;
};

export type PostData = PostMeta & {
  content: string;
  contentKo?: string;
};

function splitLocalizedContent(raw: string): { en: string; ko: string } {
  const parts = raw.split(/\n---ko---\n/);
  const en = (parts[0] || "").trim();
  const ko = (parts[1] || "").trim();
  return { en, ko: ko || en };
}

export function getSortedPostsData(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const data = matterResult.data as {
      date: string;
      title: string;
      titleKo?: string;
      excerpt: string;
      excerptKo?: string;
    };

    return {
      slug,
      date: data.date,
      title: data.title,
      titleKo: data.titleKo,
      excerpt: data.excerpt,
      excerptKo: data.excerptKo,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const { en, ko } = splitLocalizedContent(matterResult.content);
  const data = matterResult.data as {
    date: string;
    title: string;
    titleKo?: string;
    excerpt?: string;
    excerptKo?: string;
  };

  return {
    slug,
    date: data.date,
    title: data.title,
    titleKo: data.titleKo,
    excerpt: data.excerpt || "",
    excerptKo: data.excerptKo,
    content: en,
    contentKo: ko,
  };
}
