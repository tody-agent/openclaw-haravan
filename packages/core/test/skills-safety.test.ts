import { test, expect, describe } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Skill Safety & Integrity Gate', () => {
    const resolvedDir = path.resolve(process.cwd(), 'skills');

    if (!fs.existsSync(resolvedDir)) {
        test.skip('Skills directory not found');
        return;
    }

    const skillFolders = fs.readdirSync(resolvedDir).filter(f => {
        const fullPath = path.join(resolvedDir, f);
        return fs.statSync(fullPath).isDirectory();
    });

    if (skillFolders.length === 0) {
        test.skip('No skill folders found');
        return;
    }

    for (const folder of skillFolders) {
        describe(`Skill: ${folder}`, () => {
            const skillPath = path.join(resolvedDir, folder, 'SKILL.md');

            test('SKILL.md file exists', () => {
                expect(fs.existsSync(skillPath)).toBe(true);
            });

            if (!fs.existsSync(skillPath)) return;

            const content = fs.readFileSync(skillPath, 'utf-8');

            test('Contains valid frontmatter (name and description)', () => {
                expect(content).toMatch(/^---\n/);
                expect(content).toMatch(/name:\s+\S+/);
                expect(content).toMatch(/description:/);
                expect(content).toMatch(/---\n/);
            });

            test('Safety Limits: Source code not hallucinating API tokens', () => {
                expect(content).not.toMatch(/HARAVAN_TOKEN\s*=\s*['"][a-zA-Z0-9]+['"]/i);
                expect(content).not.toMatch(/Authorization:\s*Bearer\s+[a-zA-Z0-9]{10,}/i);
            });

            test('Safety Limits: File length does not exceed 500 lines', () => {
                const lines = content.split('\n');
                expect(lines.length).toBeLessThan(500);
            });
        });
    }
});
