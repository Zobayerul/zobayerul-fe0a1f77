
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "public write site_content" ON public.site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "public update site_content" ON public.site_content FOR UPDATE USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
ALTER TABLE public.site_content REPLICA IDENTITY FULL;
