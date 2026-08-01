DROP POLICY IF EXISTS "public update site_content" ON public.site_content;
DROP POLICY IF EXISTS "public write site_content" ON public.site_content;

REVOKE INSERT, UPDATE, DELETE ON public.site_content FROM anon;
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

CREATE POLICY "auth insert site_content" ON public.site_content
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth update site_content" ON public.site_content
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);