import { ProjectTasksChart } from "./Chart";
import { describe, it, expect, vi } from "vitest";  
import { render, screen } from '@testing-library/react';
import { useGlobalContext } from "@/shared/context";


vi.mock('@/shared/context/useGlobalContext', () => ({
    useGlobalContext: vi.fn()
}));

const mockTasks = [
    { id: 1, completed: true },
    { id: 2, completed: false },
    { id: 3, completed: false },
    { id: 4, completed: true }
];

describe('Chart tests', () => {
    it('should show empty message when there are no tasks', () => {
    vi.mocked(useGlobalContext).mockReturnValue({
        tasks: [],
    } as any);

    render(<ProjectTasksChart />);

    expect(
    screen.getByText(/No tasks yet/i)
  ).toBeInTheDocument();
})
})

